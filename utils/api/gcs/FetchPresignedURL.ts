import { ToastError } from '@/components/toast/alerts';

export interface FetchGCSSignedURLProps {
  fileName: string;
  contentType: string;
  folder: string;
}

export interface FetchGCSSignedURLResponse {
  signedUrl: string;
  key: string;
  publicUrl: string;
}

export async function fetchGCSSignedURL(
  props: FetchGCSSignedURLProps
): Promise<FetchGCSSignedURLResponse | null> {
  try {
    const res = await fetch('/api/gcs/signed_url/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });

    const data = await res.json();

    if (!res.ok) {
      ToastError(data?.error || 'Error fetching signed URL');
      return null;
    }

    return data;
  } catch {
    ToastError('Error fetching signed URL');
    return null;
  }
}