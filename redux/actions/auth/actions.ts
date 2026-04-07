import { UnknownAction, Dispatch } from 'redux';
import { RootState } from '@/redux/reducers';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAIL,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOGOUT,
} from './types';
import {
  IRegisterProps,
  IActivationProps,
  IResendProps,
  ILoginProps,
  IForgotPasswordProps,
  IForgotPasswordConfirmProps,
} from './interfaces';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import { ThunkDispatch } from 'redux-thunk';

export const registerAction = (props: IRegisterProps) => async (dispatch: Dispatch) => {
  try {
    const body = JSON.stringify({
      email: props.email,
      username: props.username,
      first_name: props.first_name,
      last_name: props.last_name,
      password: props.password,
      re_password: props.re_password,
    });

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    if (res.status === 201) {
      dispatch({ type: SIGNUP_SUCCESS });
      ToastSuccess('We have sent you an email, please click the link to verify your account');
    } else {
      dispatch({ type: SIGNUP_FAIL });
      ToastError('Please verify the information entered and try again.');
    }
  } catch (e) {
    console.error('Register error:', e);
    dispatch({ type: SIGNUP_FAIL });
    ToastError('Something went wrong, please try again later.');
  }
};

export const activateAction = (props: IActivationProps) => async (dispatch: Dispatch) => {
  try {
    const body = JSON.stringify({
      uid: props.uid,
      token: props.token,
    });
    const res = await fetch('/api/auth/activate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });
    if (res.status === 204 || res.status === 200) {
      dispatch({ type: ACTIVATION_SUCCESS });
      ToastSuccess('Your account has been activated, you may now login');
    } else {
      dispatch({ type: ACTIVATION_FAIL });
      ToastError('There was an error activating your account.');
    }
  } catch (e) {
    console.error('Register error:', e);
    dispatch({ type: ACTIVATION_FAIL });
    ToastError('Something went wrong, please try again later.');
  }
};

export const resendAction = async (props: IResendProps) => {
  try {
    const body = JSON.stringify({
      email: props.email,
    });
    const res = await fetch('/api/auth/resend_activation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });
    if (res.status === 204 || res.status === 200) {
      ToastSuccess('We have send you a new email to activate your account.');
    } else {
      ToastError('There was an error activating your account.');
    }
  } catch (e) {
    console.error('Register error:', e);
    ToastError('Something went wrong, please try again later.');
  }
};
export const forgotPasswordAction = async (props: IForgotPasswordProps) => {
  try {
    const body = JSON.stringify({
      email: props.email,
    });
    const res = await fetch('/api/auth/forgot_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });
    if (res.status === 204 || res.status === 200) {
      ToastSuccess('We have send you a new email to reset your password.');
    } else {
      ToastError('There was an error activating your account.');
    }
  } catch (e) {
    console.error('Register error:', e);
    ToastError('Something went wrong, please try again later.');
  }
};

export const forgotPasswordConfirmAction = async (props: IForgotPasswordConfirmProps) => {
  try {
    const body = JSON.stringify({
      new_password: props.new_password,
      re_new_password: props.re_new_password,
      uid: props.uid,
      token: props.token,
    });
    const res = await fetch('/api/auth/forgot_password_confirm', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });
    if (res.status === 200 || res.status === 204) {
      ToastSuccess('Your password has been changed successfully.');
    } else {
      ToastError('There was an error changing your password.');
    }
  } catch (e) {
    console.error('Register error:', e);
    ToastError('Something went wrong, please try again later.');
  }
};

export const load_user = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/user', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } else {
      dispatch({ type: LOAD_USER_FAIL });
    }
  } catch (error) {
    console.error('Loading user error:', error);
    dispatch({ type: LOAD_USER_FAIL });
  }
};

export const loadProfileAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/profile', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      dispatch({ type: LOAD_PROFILE_SUCCESS, payload: data.user });
    } else {
      dispatch({ type: LOAD_PROFILE_FAIL });
      ToastError("Error loading user profile")
    }
  } catch (error) {
    console.error('Loading profile error:', error);
    dispatch({ type: LOAD_PROFILE_FAIL });
  }
};

export const loginAction =
  (props: ILoginProps) => async (dispatch: ThunkDispatch<RootState, void, UnknownAction>) => {
    try {
      const body = JSON.stringify({
        email: props.email,
        password: props.password,
      });

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      if (res.status === 200) {
        dispatch({ type: LOGIN_SUCCESS });
        ToastSuccess('Login successfully!');
        await dispatch(load_user());
        await dispatch(loadProfileAction());
      } else {
        dispatch({ type: LOGIN_FAIL });
        ToastError('Please verify the information entered and try again.');
      }
    } catch (e) {
      console.error('Register error:', e);
      dispatch({ type: LOGIN_FAIL });
      ToastError('Something went wrong, please try again later.');
    }
  };

export const refreshTokenAccessAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST'
    });
    if (res.status === 200) {
      dispatch({ type: REFRESH_TOKEN_SUCCESS });
    } else {
      dispatch({ type: REFRESH_TOKEN_FAIL });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: REFRESH_TOKEN_FAIL });
  }
};
export const verify_access_token = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/verify', {
      method: 'POST'
    });
    if (res.status === 200) {
      dispatch({ type: VERIFY_TOKEN_SUCCESS });
    } else {
      dispatch({ type: VERIFY_TOKEN_FAIL });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: VERIFY_TOKEN_FAIL });
  }
};


export const setLoginSuccessAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
}

export const logoutAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/logout');
    if (res.status === 200) {
      dispatch({ type: LOGOUT });
    }
  } catch {
    ToastError('Could not log out');
  }
};