#!/usr/bin/env npx tsx
/**
 * Download one or more forum posts from Torn and save as a single document.
 *
 * Usage:
 *   npx tsx scripts/download-forum-post.ts <output-file> <url> [url...]
 *
 * Examples:
 *   # Download entire thread (first post only by default)
 *   npx tsx scripts/download-forum-post.ts docs/forum/some-guide.txt \
 *     "https://www.torn.com/forums.php#/p=threads&f=61&t=16287997"
 *
 *   # Download specific posts (treated as one document)
 *   npx tsx scripts/download-forum-post.ts docs/forum/some-guide.txt \
 *     "https://www.torn.com/forums.php#/p=threads&f=61&t=16287997&b=0&a=0" \
 *     "https://www.torn.com/forums.php#/p=threads&f=61&t=16287997&b=0&a=0&to=22660676"
 *
 * Requires TORN_API_KEY in .env
 */

import { TornAPI } from "torn-client";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// Load .env
const envPath = resolve(process.cwd(), ".env");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  }
} catch {
  // .env file doesn't exist, that's fine if TORN_API_KEY is set elsewhere
}

const apiKey = process.env.TORN_API_KEY;
if (!apiKey) {
  console.error("Error: TORN_API_KEY not found in .env or environment");
  process.exit(1);
}

// Parse command line args
const [, , outputFile, ...urls] = process.argv;

if (!outputFile || urls.length === 0) {
  console.error("Usage: npx tsx scripts/download-forum-post.ts <output-file> <url> [url...]");
  process.exit(1);
}

// Parse forum URL to extract thread ID and optional post ID
function parseForumUrl(url: string): { threadId: number; postId?: number } {
  // URLs look like:
  // https://www.torn.com/forums.php#/p=threads&f=61&t=16287997&b=0&a=0
  // https://www.torn.com/forums.php#/p=threads&f=61&t=16287997&b=0&a=0&to=22660676

  const threadMatch = url.match(/[&?]t=(\d+)/);
  const postMatch = url.match(/[&?]to=(\d+)/);

  if (!threadMatch) {
    throw new Error(`Could not parse thread ID from URL: ${url}`);
  }

  return {
    threadId: parseInt(threadMatch[1], 10),
    postId: postMatch ? parseInt(postMatch[1], 10) : undefined,
  };
}

async function main() {
  const client = new TornAPI({ apiKeys: [apiKey] });

  // Parse all URLs
  const parsed = urls.map(parseForumUrl);

  // All URLs should reference the same thread
  const threadIds = [...new Set(parsed.map((p) => p.threadId))];
  if (threadIds.length > 1) {
    console.error("Error: All URLs must reference the same thread");
    process.exit(1);
  }

  const threadId = threadIds[0];

  console.log(`Fetching thread ${threadId}...`);

  // Fetch all posts from the thread
  const response = await client.forum.withThreadId(threadId).posts({ striptags: "false" });
  const allPosts = response.posts;

  // Resolve post IDs - URLs without `to=` mean "first post in thread"
  const firstPostId = allPosts[0]?.id;
  const postIds = parsed.map((p) => p.postId ?? firstPostId).filter((id): id is number => id !== undefined);

  // Filter to the requested posts
  let posts = allPosts.filter((p) => postIds.includes(p.id));

  if (posts.length !== postIds.length) {
    const foundIds = posts.map((p) => p.id);
    const missingIds = postIds.filter((id) => !foundIds.includes(id));
    console.warn(`Warning: Could not find posts with IDs: ${missingIds.join(", ")}`);
  }

  // Sort by the order they were specified in URLs, dedupe
  const seenIds = new Set<number>();
  posts = postIds
    .filter((id) => {
      if (seenIds.has(id)) return false;
      seenIds.add(id);
      return true;
    })
    .map((id) => posts.find((p) => p.id === id)!)
    .filter(Boolean);

  if (posts.length === 0) {
    console.error("Error: No posts found");
    process.exit(1);
  }

  // Build output document
  const now = new Date().toISOString().split("T")[0];
  const author = posts[0].author.username;
  const sourceUrls = urls.join("\n    ");

  let output = `<!--
  Downloaded: ${now}
  Thread ID: ${threadId}
  Post IDs: ${posts.map((p) => p.id).join(", ")}
  Author: ${author}
  Source:
    ${sourceUrls}
-->

`;

  // Append each post's content
  for (const post of posts) {
    output += post.content + "\n\n";
  }

  // Write to file
  writeFileSync(outputFile, output.trim() + "\n");
  console.log(`Saved ${posts.length} post(s) to ${outputFile}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
