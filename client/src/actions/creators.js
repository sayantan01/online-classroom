import axios from "axios";
import {
  loginUser,
  updateClassroom,
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
      dispatch(resetError());
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
      return dispatch(updateClassroom(response.data.classrooms));
    } catch (err) {
      return dispatch(receiveError(err.response.data.msg));
    }
  };
};

export const createAssignment = (details) => {
  return async (dispatch) => {
    try {
      dispatch(resetError());
      let url = "/api/assignment/create";
      const formData = new FormData();
      formData.append("title", details.title);
      formData.append("statement", details.statement);
      formData.append("deadline", details.deadline);
      formData.append("classroom_id", details.classroom_id);
      formData.append("attachment", details.attachment);

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: "Bearer " + details.token,
          ContentType: "multipart/form-data",
        },
      });
      return dispatch(updateClassroom(response.data.classrooms));
    } catch (err) {
      return dispatch(receiveError(err.response.data.msg));
    }
  };
};
