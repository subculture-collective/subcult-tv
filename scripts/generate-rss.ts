#!/usr/bin/env node

/**
 * RSS Feed Generator for SUBCULT Zine
 *
 * Generates RSS 2.0 feed from the static post registry.
 * Run before build: npm run generate-rss
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getPublishedPosts } from '../src/lib/posts.js';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author?: string;
}

// Site configuration
const SITE_URL = 'https://subcult.tv';
const SITE_TITLE = 'SUBCULT Zine';
const SITE_DESCRIPTION = 'Transmissions from the Subculture Collective';
const FEED_URL = `${SITE_URL}/feed.xml`;

/**
 * Converts a date string to RFC 822 format (required by RSS 2.0)
 */
function toRFC822Date(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

/**
 * Escapes XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates RSS 2.0 feed XML
 */
function generateRSS(posts: Post[]): string {
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Get the latest post date for lastBuildDate
  const latestDate =
    sortedPosts.length > 0 ? sortedPosts[0].date : new Date().toISOString().split('T')[0];

  // Build RSS items
  const items = sortedPosts
    .map((post) => {
      const postUrl = `${SITE_URL}/zine/${post.slug}`;
      const pubDate = toRFC822Date(post.date);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>noreply@subcult.tv (${escapeXml(post.author || 'SUBCULT')})</author>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/zine</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${toRFC822Date(latestDate)}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return rss;
}

/**
 * Main execution
 */
function main() {
  console.log('🔧 Generating RSS feed for SUBCULT Zine...');

  // Generate RSS XML
  const published = getPublishedPosts();
  const rssXml = generateRSS(published);

  // Ensure public directory exists
  const publicDir = join(process.cwd(), 'public');
  mkdirSync(publicDir, { recursive: true });

  // Write feed.xml to public directory (copied to dist during build)
  const feedPath = join(publicDir, 'feed.xml');
  writeFileSync(feedPath, rssXml, 'utf-8');

  console.log(`✅ RSS feed generated: ${feedPath}`);
  console.log(`📊 ${published.length} posts included`);
  console.log(`🔗 Feed URL: ${FEED_URL}`);
}

// Run the script
main();
