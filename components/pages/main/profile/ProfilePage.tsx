
import ProfileInfo from '@/components/pages/main/profile/ProfileInfo';
import UserInfo from '@/components/pages/main/profile/UserInfo';
import Container from '@/components/ui/Container';


const ProfilePage = () => {
  return (
    <Container>
      <UserInfo />

      <ProfileInfo />
    </Container>
  );
};

export default ProfilePage;
