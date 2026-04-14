import { User } from "../auth/user";
import { IMedia } from "../media/media";
import { ICategory, ICategoryList } from "./category";

export interface ICreatePost {
  title: string;
  description: string;
  content: string;
  thumbnail?: string;
  keywords?: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
}

export interface IEditPost extends ICreatePost {
  post_slug: string;
}


export interface IHeading {
  id: string;
  title: string;
  slug: string;
  level: string;
  order: number;
}

export interface IPost {
  id: string;
  user: string;
  title: string;
  description: string;
  content: string;
  thumbnail: IMedia | null;
  keywords?: string;
  slug: string;
  category: ICategory;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published';
  headings: IHeading[];
  view_count: number;
  comments_count: number;
  has_liked: boolean;
  likes_count: number;
}


export interface IPostList {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
  description: string;
  thumbnail: IMedia | null;
  slug: string;
  category: ICategoryList;
  view_count: string;
  user: User;
  status: string;
  featured: boolean;
}