import EditPostForm from '@/components/forms/EditPost';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { usePostAuthorDetail } from '@/hooks/usePostAuthor';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

interface ComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
}

export default function EditPostModal({ open, setOpen, slug }: ComponentProps) {
  const { data: post, isLoading, error } = usePostAuthorDetail(slug, open);

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex justify-center py-6">
        <LoadingMoon />
      </div>
    );
  } else if (error) {
    content = <p className="text-md text-red-500 text-center ">Error loading post</p>;
  } else if (post) {
    content = <EditPostForm post={post} slug={slug} />;
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  Edit post
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{post?.title ?? ''}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6">{content}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}