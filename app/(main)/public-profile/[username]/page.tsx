import PublicProfilePage from '@/components/pages/main/public-profile/PublicProfilePage';
import { getPublicProfile } from '@/lib/api/getPublicProfile';

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { username } = await params;

  const data = await getPublicProfile(username);

  if (!data) {
    return <div>User not found</div>;
  }

  const user = data?.user;
  const profile = data?.profile;

  return (
    <PublicProfilePage user={user} profile={profile} />
  );
}
