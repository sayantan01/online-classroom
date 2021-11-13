import axios from "axios";
import {
  loginUser,
  createClassroom,
  receiveError,
  resetError,
} from "./actionUtils";

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch(resetError());
      const response = await axios.post("api/user/login", user);
      const { token, email, isTeacher, classrooms } = response.data;
      return dispatch(loginUser(token, email, isTeacher, classrooms));
    } catch (err) {
      return dispatch(receiveError(err.response.data.msg));
    }
  };
};

export const createOrJoinClass = (credentials) => {
  return async (dispatch) => {
    try {
      let reqObj = {};
      if (credentials.isTeacher) reqObj.name = credentials.name;
      else reqObj.passcode = credentials.passcode;
      let url = credentials.isTeacher
        ? "/api/classroom/create"
        : "/api/classroom/join";
      const response = await axios.post(url, reqObj, {
        headers: {
          Authorization: "Bearer " + credentials.token,
        },
      });
      return dispatch(createClassroom(response.data.classrooms));
    } catch (err) {
      return dispatch(receiveError(err.response.data.msg));
    }
  };
};
