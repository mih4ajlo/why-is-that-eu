import { defineCollection, z } from 'astro:content';

const directives = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    directive: z.string().optional(),
    category: z.string(),
    year: z.number(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    status: z.enum(['in-force', 'proposed', 'repealed']).default('in-force'),
  }),
});

export const collections = { directives };
