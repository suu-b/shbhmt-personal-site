import { z } from 'zod';

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    techStack: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    github: z.string().optional(),
});
