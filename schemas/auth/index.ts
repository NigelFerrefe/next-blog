import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.email(),
    username: z
      .string()
      .min(2, 'Username must be longer than 2 characters')
      .max(40, 'Username must be shorter than 40 characters'),
    firstName: z.string(),
    lastName: z.string(),
    password: z
      .string()
      .min(8, 'Min 8 character')
      .max(32, 'Max 32 character')
      .regex(/[A-Z]/, 'Must have an Uppercase')
      .regex(/[a-z]/, 'Must have a Lowercase')
      .regex(/\d/, 'Must have a number')
      .regex(/[^A-Za-z0-9]/, 'Must have a symbol'),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  });

export const ResendSchema = z.object({
  email: z.email(),
});

export const newPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, 'Min 8 character')
      .max(32, 'Max 32 character')
      .regex(/[A-Z]/, 'Must have an Uppercase')
      .regex(/[a-z]/, 'Must have a Lowercase')
      .regex(/\d/, 'Must have a number')
      .regex(/[^A-Za-z0-9]/, 'Must have a symbol'),
    re_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.re_new_password, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const sendOTPSchema = z.object({
  email: z.email(),
});

export const verifyOTPSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters'),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Min 3 characters')
    .max(20, 'Max 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
});

export const mediaSchema = z.object({
  id: z.string(),
  order: z.string(),
  name: z.string(),
  size: z.string(),
  type: z.string(),
  key: z.string(),
  url: z.string(),
  media_type: z.string(),
});

export const updateProfileSchema = z.object({
  bio: z.string(),
  instagram: z.string(),
  linkedin: z.string(),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine((date) => {
      const [year, month, day] = date.split('-').map(Number);
      const parsed = new Date(date);

      return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.getUTCFullYear() === year &&
        parsed.getUTCMonth() + 1 === month &&
        parsed.getUTCDate() === day
      );
    }, 'Invalid date')
    .or(z.literal(''))
});

export const changePasswordSchema = z.object({
  current_password: z.string().min(8, 'Min 8 character').max(32, 'Max 32 character'),
  new_password: z
    .string()
    .min(8, 'Min 8 character')
    .max(32, 'Max 32 character')
    .regex(/[A-Z]/, 'Must have an Uppercase')
    .regex(/[a-z]/, 'Must have a Lowercase')
    .regex(/\d/, 'Must have a number')
    .regex(/[^A-Za-z0-9]/, 'Must have a symbol'),
  re_new_password: z.string(),
}).refine((data) => data.new_password === data.re_new_password, {
  message: 'Passwords do not match',
  path: ['re_new_password'],
});

