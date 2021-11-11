export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const CREATE_CLASSROOM = "CREATE_CLASSROOM";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

export const loginUser = (token, email, isTeacher, classrooms) => {
  return {
    type: LOGIN_USER,
    token,
    email,
    isTeacher,
    classrooms,
  };
};

export const createClassroom = (classrooms) => {
  return {
    type: CREATE_CLASSROOM,
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
