import axios from "axios";
import { loginUser, createClassroom, receiveError } from "./actionUtils";

export const login = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("api/user/login", user);
      const { token, email, isTeacher, classrooms } = response.data;
      return dispatch(loginUser(token, email, isTeacher, classrooms));
    } catch (err) {
      return dispatch(receiveError(err.response.data.msg));
    }
  };
};

export const createClass = (credentials) => {
  return async (dispatch) => {
    try {
      const reqObj = {
        name: credentials.name,
      };
      const response = await axios.post("/api/classroom/create", reqObj, {
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
