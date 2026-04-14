'use client';

import CustomTabs from '@/components/ui/CustomTabs';
import CreatePost from '../blog/CreatePost';
import ListPosts from '../blog/ListPostAuthor';

const Tabs = ({ isCostumer, isOwner, username }: { isCostumer: boolean; isOwner: boolean; username: string; }) => {
  return (
    <div className='mt-8'>
      <CustomTabs
        titles={!isCostumer && isOwner ? ['Posts', 'Create Post'] : ['Posts']}
        panels={
          !isCostumer && isOwner
            ? [
                <div key="tab1" className='mt-6'><ListPosts username={username} isOwner={isOwner} /></div>,
                <div key="tab2" className='mt-6'>
                  <CreatePost />
                </div>,
              ]
            : [<div key="tab1" className='mt-6'><ListPosts username={username} isOwner={isOwner} /></div>]
        }
      />
    </div>
  );
};

export default Tabs;
