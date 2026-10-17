import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string().default('Team'),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  /** Matching English slug for hreflang (Italian collection only). */
  translationOf: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: postSchema,
});

const blogIt = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog-it' }),
  schema: postSchema,
});

export const collections = { blog, blogIt };
