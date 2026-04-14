import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be longer than 3 characters'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(10, 'Content is required'),
  keywords: z.string().optional(),
  slug: z.string(),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['draft', 'published'])
});

export const updatePostSchema = z.object({
  title: z.string().min(3, 'Title must be longer than 3 characters'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(10, 'Content is required'),
  keywords: z.string().optional(),
  slug: z.string(),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['draft', 'published']),
});