import { User } from '@/types/auth/user';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAIL,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOGOUT,
} from '../actions/auth/types';
import { Profile } from '@/types/auth/profile';

type Action = {
  type: string;
  payload?: any;
};

type State = {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
};

const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
};

export default function authReducer(state: State = initialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return { ...state };
    case SIGNUP_FAIL:
      return { ...state };
    case ACTIVATION_SUCCESS:
      return { ...state };
    case ACTIVATION_FAIL:
      return { ...state };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false };
    case LOAD_USER_SUCCESS:
      return { ...state, user: payload };
    case LOAD_USER_FAIL:
      return { ...state, user: null };
    case LOAD_PROFILE_SUCCESS:
      return { ...state, profile: payload };
    case LOAD_PROFILE_FAIL:
      return { ...state, profile: null };
    case REFRESH_TOKEN_SUCCESS:
      return { ...state };
    case REFRESH_TOKEN_FAIL:
      return { ...state, user: null };
    case VERIFY_TOKEN_SUCCESS:
      return { ...state };
    case VERIFY_TOKEN_FAIL:
      return { ...state, user: null };
    case LOGOUT:
      return { ...state, user: null, profile: null, isAuthenticated: false };
    default:
      return state;
  }
}
