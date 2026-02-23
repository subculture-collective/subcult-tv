#!/usr/bin/env node

/**
 * PDF Generator for SUBCULT Investor Materials
 *
 * Exports pitch deck and one-pager pages (standard + brand) as PDFs.
 * Requires a Vite preview server running on port 4173.
 *
 * Usage:
 *   1. npm run build
 *   2. npm run preview (in a separate terminal)
 *   3. npm run generate-pdfs
 */

import puppeteer from 'puppeteer';
import { join } from 'path';
import { mkdirSync } from 'fs';

const BASE_URL = 'http://localhost:4173';
const OUTPUT_DIR = join(process.cwd(), 'public', 'press-kit');

const PAGES = [
  {
    path: '/deck',
    filename: 'subcult-deck.pdf',
    label: 'Pitch Deck (Standard)',
    landscape: true,
  },
  {
    path: '/onepager',
    filename: 'subcult-onepager.pdf',
    label: 'One-Pager (Standard)',
    landscape: false,
  },
  {
    path: '/deck/brand',
    filename: 'subcult-deck-brand.pdf',
    label: 'Pitch Deck (Brand)',
    landscape: true,
  },
  {
    path: '/onepager/brand',
    filename: 'subcult-onepager-brand.pdf',
    label: 'One-Pager (Brand)',
    landscape: false,
  },
];

async function main() {
  console.log('Generating PDFs for SUBCULT investor materials...');
  console.log(`Expecting preview server at ${BASE_URL}\n`);

  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const page of PAGES) {
      const url = `${BASE_URL}${page.path}`;
      const outputPath = join(OUTPUT_DIR, page.filename);

      console.log(`  ${page.label}`);
      console.log(`    URL: ${url}`);

      const tab = await browser.newPage();

      // Set viewport for consistent rendering
      await tab.setViewport({ width: 1280, height: 900 });

      // Navigate and wait for content to load
      await tab.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait a moment for any animations/fonts to settle
      await new Promise((r) => setTimeout(r, 1000));

      // Emulate print media for proper styles
      await tab.emulateMediaType('print');

      // Generate PDF
      await tab.pdf({
        path: outputPath,
        format: 'Letter',
        landscape: page.landscape,
        printBackground: false,
        margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
      });

      console.log(`    Saved: ${outputPath}\n`);
      await tab.close();
    }

    console.log(`Done. ${PAGES.length} PDFs generated in ${OUTPUT_DIR}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('PDF generation failed:', err.message);
  process.exit(1);
});
