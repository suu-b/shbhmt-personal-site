import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { articleSchema, projectSchema } from '@preface/shared';

export const collections = {
    articles: defineCollection({
        loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/articles" }),
        schema: articleSchema,
    }),
    giants: defineCollection({
        loader: file('./src/content/giants.json'),
    }),
    projects: defineCollection({
        loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/projects" }),
        schema: projectSchema,
    }),
};
