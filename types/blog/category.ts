import { IMedia } from '../media/media';

export interface ICategory {
  parent: any;
  name: string;
  title: string;
  description: string;
  thumbnail: IMedia;
  slug: string;
}
