import { IPost } from "@/types/blog/post";
import { useQuery } from "@tanstack/react-query";

export const usePostDetail = (slug: string) => {
  return useQuery({
    queryKey: ['post-detail', slug],
    enabled: !!slug,
    queryFn: async () => {
      const res = await fetch(
        `/api/blog/post/detail/?slug=${encodeURIComponent(slug)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to load post');
      }
    
      return data as IPost;
    },
  });
};