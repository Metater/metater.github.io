import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const metric = z.object({
  value: z.string(),
  label: z.string(),
  asOf: z.string().optional(),
  sourceUrl: z.url().optional(),
  note: z.string().optional()
});

const demo = z.object({
  id: z.string(),
  shellUrl: z.string(),
  download: z.string(),
  aspectRatio: z.string(),
  mobilePolicy: z.enum(['supported', 'warn', 'fallback']),
  permissions: z.array(z.string()),
  fallbackDescription: z.string()
});

const games = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.string(),
    releaseDate: z.string(),
    developer: z.string(),
    publisher: z.string(),
    roles: z.array(z.string()),
    steamUrl: z.url(),
    image: z.string(),
    imageAlt: z.string(),
    tagline: z.string(),
    overview: z.string(),
    studio: z.string(),
    studioNote: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    gallery: z.array(z.object({ src: z.string(), alt: z.string() })),
    highlights: z.array(z.object({ title: z.string(), description: z.string() })),
    technologies: z.array(z.string()),
    metrics: z.array(metric).default([]),
    order: z.number()
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    description: z.string(),
    challenge: z.string(),
    responsibilities: z.array(z.string()),
    decisions: z.array(z.string()),
    outcomes: z.array(z.string()),
    technologies: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), url: z.string() })),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    customPath: z.string().optional(),
    demo: demo.optional(),
    order: z.number()
  })
});

const adopters = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/adopters' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['game', 'open-source']),
    url: z.url(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    relationship: z.string(),
    reach: z.string().optional(),
    sourceNote: z.string(),
    asOf: z.string(),
    order: z.number()
  })
});

export const collections = { games, projects, adopters };
