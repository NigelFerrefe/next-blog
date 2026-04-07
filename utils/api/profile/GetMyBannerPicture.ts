export default async function fetchMyBannerPicture() {
  const res = await fetch('/api/media/get_banner_picture', {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || 'Error fetching banner picture');
  }

  return data;
}