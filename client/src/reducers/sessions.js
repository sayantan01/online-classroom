import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_CLASSROOM,
  RECEIVE_ERROR,
  RESET_ERROR,
} from "../actions/actionUtils";

const initialState = {
  token: null,
  email: "",
  isTeacher: false,
  msg: "",
  classrooms: null,
};

function reducer(state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case LOGIN_USER:
      const obj = {
        ...state,
        token: action.token,
        email: action.email,
        isTeacher: action.isTeacher,
        classrooms: action.classrooms,
        msg: "",
      };
      return obj;

    case UPDATE_CLASSROOM:
      const pobj = {
        ...state,
        classrooms: action.classrooms,
        msg: "",
      };
      return pobj;

    case LOGOUT_USER:
      return initialState;

    case RECEIVE_ERROR:
      return {
        ...state,
        msg: action.msg,
      };

    case RESET_ERROR:
      return {
        ...state,
        msg: "",
      };

    default:
      return state;
  }
}

export default reducer;
