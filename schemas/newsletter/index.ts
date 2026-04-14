import { z } from 'zod';

export const newsletterSubscribeSchema = z.object({
  email: z.email(),
});

export const newsletterContactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  message: z.string(),
});
