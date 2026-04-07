
import Container from '@/components/ui/Container';
import UserInfo from './UserInfo';
import ProfileInfo from './ProfileInfo';

const ProfilePage = () => {
  return (
    <Container>
      <UserInfo />

      <ProfileInfo />
    </Container>
  );
};

export default ProfilePage;
