// getPublicProfile.ts
import { serverGetPublic } from '@/lib/api/api.server';
import { Profile } from '@/types/auth/profile';
import { User } from '@/types/auth/user';


interface PublicProfileResponse {
  user: User;
  profile: Profile;
}

export async function getPublicProfile(username: string) {
  const { data, ok } = await serverGetPublic<PublicProfileResponse>(
    `/api/profile/get/?username=${username}`
  );
  if (!ok) return null;
  return data;
}