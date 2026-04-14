import PublicProfilePage from '@/components/pages/main/public-profile/PublicProfilePage';
import { getPublicProfile } from '@/lib/api/getPublicProfile';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { username } = await params;

  const data = await getPublicProfile(username);

  if (!data) {
    notFound();
  }

  const user = data?.user;
  const profile = data?.profile;

  return <PublicProfilePage user={user} profile={profile} />;
}
