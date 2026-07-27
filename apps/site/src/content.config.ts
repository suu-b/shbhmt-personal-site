import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { articleSchema } from '@preface/shared';

export const collections = {
    articles: defineCollection({
        loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/articles" }),
        schema: articleSchema,
    }),
};
