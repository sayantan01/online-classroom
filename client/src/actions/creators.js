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
      const reqObj = {
        title: details.title,
        statement: details.statement,
        deadline: details.deadline,
        classroom_id: details.classroom_id,
      };

      const response = await axios.post(url, reqObj, {
        headers: {
          Authorization: "Bearer " + details.token,
        },
      });
      return dispatch(updateClassroom(response.data.classrooms));
    } catch (err) {
      return dispatch(receiveError(err.response.data.msg));
    }
  };
};

export const submitAssignment = (details) => {
  return async (dispatch) => {
    try {
      dispatch(resetError());
      let url = "/api/assignment/submit";
      const reqObj = {
        answer: details.answer,
        email: details.email,
        assignment_id: details.assignment_id,
      };

      const response = await axios.post(url, reqObj, {
        headers: {
          Authorization: "Bearer " + details.token,
        },
      });
      return dispatch(updateClassroom(response.data.classrooms));
    } catch (err) {
      return dispatch(receiveError(err.response.data.msg));
    }
  };
};

export const fetchData = (token) => {
  return async (dispatch) => {
    try {
      dispatch(resetError());
      let url = "/api/classroom/fetch";

      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return dispatch(updateClassroom(response.data.classrooms));
    } catch (err) {
      return dispatch(receiveError("Error in fetching data"));
    }
  };
};
