export interface IMedia {
  id: string;
  order: string;
  name: string;
  size: string;
  type: string;
  key: string;
  url: string;
  media_type: string;
}


export interface ISelectedImage {
  id: string;
  title: string;
  file: File;
  size: string;
  type: string;
  lastModified: number;
}

export type ImageValue = IMedia | ISelectedImage | null;