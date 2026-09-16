/**
 * ─────────────────────────────────────────────────────────────────────────────
 * IMAGE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Local images under src/assets/images/. Astro optimizes them at build time.
 *
 *   hero/      ← homepage Hero (imported in Hero.astro)
 *   about/     ← optional About section image
 *   gallery/   ← optional gallery photos (auto-discovered)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ImageMetadata } from 'astro';

/** Optional credit under the hero. */
export const heroImageCredit: { label: string; href: string } | null = {
  label: 'Photo: Sergey Omelchenko / Unsplash',
  href: 'https://unsplash.com/photos/a-bridge-over-a-body-of-water-with-buildings-around-it-_D6ttEOqGgo',
};

// ── About ─────────────────────────────────────────────────────────────────────
// Optional: drop a file into src/assets/images/about/ and export it here.
// import aboutImage from '../assets/images/about/team.jpg';
export const aboutImage: ImageMetadata | undefined = undefined;

// ── Gallery: auto-discovered ─────────────────────────────────────────────────
// Drop images into src/assets/images/gallery/; file name becomes alt text.

export interface GalleryImage {
  src: ImageMetadata | string;
  alt: string;
}

export const galleryImages: GalleryImage[] = Object.entries(
  import.meta.glob<{ default: ImageMetadata }>(
    '../assets/images/gallery/*.{jpg,jpeg,png,webp,avif}',
    { eager: true },
  ),
).map(([path, mod]): GalleryImage => ({
  src: mod.default,
  alt: path
    .split('/').pop()!
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()),
}));
