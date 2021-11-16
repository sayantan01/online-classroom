export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_CLASSROOM = "UPDATE_CLASSROOM";
export const RECEIVE_ERROR = "RECEIVE_ERROR";
export const RESET_ERROR = "RESET_ERROR";

export const loginUser = (token, email, isTeacher, classrooms) => {
  return {
    type: LOGIN_USER,
    token,
    email,
    isTeacher,
    classrooms,
  };
};

export const updateClassroom = (classrooms) => {
  return {
    type: UPDATE_CLASSROOM,
    classrooms,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const receiveError = (msg) => {
  return {
    type: RECEIVE_ERROR,
    msg,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};
