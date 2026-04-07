import { Profile } from '@/types/auth/profile';
import { User } from '@/types/auth/user';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import BioInfo from './BioInfo';
import Tabs from './Tabs';

interface PublicProfileProps {
  user: User;
  profile: Profile;
}

const PublicProfilePage = ({ user, profile }: PublicProfileProps) => {
  const socials = [
    {
      name: 'Instagram',
      href: profile.instagram,
      icon: <FaInstagram className="h-5 w-5" />,
    },
    {
      name: 'LinkedIn',
      href: profile.linkedin,
      icon: <FaLinkedin className="h-5 w-5" />,
    },
  ];
  const isCostumer = user?.role === 'customer';
  return (
    <div>
      <Image
        width={1920}
        height={1080}
        className="h-48 w-full object-cover lg:h-64"
        src={profile.banner_picture.url || ''}
        alt=""
        priority
      />
      <div className="mx-auto max-w-5xl px-4 pb-32 md:px-6 lg:px-8">
        <div className="-mt-12 md:-mt-12 md:flex md:items-end md:space-x-5">
          <div className="flex shrink-0">
            <Image
              width={512}
              height={512}
              className="border-dm-second h-24 w-24 rounded-full border bg-white object-cover md:h-32 md:w-32"
              src={profile.profile_picture.url || ''}
              alt=""
            />
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              {user.verified && <BadgeCheck className="h-5 w-auto text-green-700" />}
            </div>
            <div className="flex items-center space-x-2">
              {socials?.map((item) => {
                if (item?.href && item?.href.trim() !== '') {
                  return (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item?.name}
                      href={item?.href}
                    >
                      {item?.icon}
                    </Link>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
        <BioInfo bio={profile.bio} />
        <Tabs isCostumer={isCostumer}/>
      </div>
    </div>
  );
};

export default PublicProfilePage;
