import { fetchGCSSignedURL } from './FetchPresignedURL';

export async function getSignedUrlForPostImage(
  file: File,
  slug: string,
  username?: string
) {
  const finalFolder = username
    ? `media/blog/posts/${username}/${slug}`
    : `media/blog/posts/${slug}`;

  const response = await fetchGCSSignedURL({
    fileName: file.name,
    contentType: file.type,
    folder: finalFolder,
  });

  if (!response) {
    throw new Error('Failed to get signed URL');
  }

  return response;
}