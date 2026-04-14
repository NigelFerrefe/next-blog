import { post } from '@/lib/api/api.client';
import { ContactMessagePayload } from '@/types/newsletter';


export const newsletterSignup = async (data: { email: string }) => {
  return post('/api/newsletter/subscribe/', data);
};

export const newsletterContact = async (data: ContactMessagePayload) => {
  return post('/api/newsletter/contact/', data);
};