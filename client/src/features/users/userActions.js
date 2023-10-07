import { publicRequest } from '../../utils/requestMethods';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerStart,
  registerSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from './userSlice';

export const login = (user) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await publicRequest.post('/login', user);
      dispatch(loginSuccess(response.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
};
export const register = (user) => {
  return async (dispatch) => {
    dispatch(registerStart());
    try {
      const res = await publicRequest.post('/register', user);
      dispatch(registerSuccess(res.data));
    } catch (error) {
      dispatch(registerFailure());
    }
  };
};
export const logout = (user) => {
  return async (dispatch) => {
    dispatch(logoutStart());
    try {
      const res = await publicRequest.post('/logout', user);
      dispatch(logoutSuccess(res.data));
    } catch (error) {
      dispatch(logoutFailure());
    }
  };
};
