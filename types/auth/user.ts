import { IMedia } from '../media/media';

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  verified: boolean;
  updated_at: string;
  two_factor_enabled: boolean;
  otpauth_url: string;
  login_otp: string;
  login_otp_used: boolean;
  otp_created_at: string;
  qr_code: string;
  profile_picture: IMedia;
}

export interface UserSecurity {
  current_password: string;
  new_password: string;
  re_new_password: string;
}
