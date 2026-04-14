import axios from 'axios';
import { ICreatePost, IEditPost } from '@/types/blog/post';

export const createPost = async (data: ICreatePost) => {
  try {
    const res = await axios.post('/api/blog/post', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error creating post');
    }
    throw new Error('Unexpected error');
  }
};
export const updatePost = async (data: IEditPost) => {
  try {
    const res = await axios.put('/api/blog/post', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error updating post');
    }
    throw new Error('Unexpected error');
  }
};
