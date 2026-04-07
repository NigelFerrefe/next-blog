import { fetchGCSSignedURL } from "./FetchPresignedURL";

export type UploadFolder = 'profile' | 'banner';

export async function getSignedUrlForImage(
  file: File,
  folder: UploadFolder,
  userId: string
) {
  const finalFolder = `users/${userId}/${folder}`;

  const response = await fetchGCSSignedURL({
    fileName: file.name,
    contentType: file.type,
    folder: finalFolder,
  });

  if (!response) {
    throw new Error('Failed to get signed URL');
  }

  return response; // { signedUrl, key, publicUrl }
}