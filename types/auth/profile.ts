import { IMedia } from "../media/media";

export interface Profile {
  id: string;
  bio: string;
  instagram: string;
  linkedin: string;
  birthday: string;
  profile_picture: IMedia;
  banner_picture: IMedia;
}
