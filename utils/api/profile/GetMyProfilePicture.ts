export default async function fetchMyProfilePicture() {
  const res = await fetch('/api/media/get_profile_picture', {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || 'Error fetching profile picture');
  }

  return data;
}