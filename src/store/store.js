import { devToolsEnhancer } from "redux-devtools-extension";
import { createStore } from "redux";

//import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  logged: false,
  popup: { visibility: false, text: "" },
};

const reductor = (state = initialState, action) => {
  if (action.type === "USER_LOGGED") {
    return {
      ...state,
      logged: true,
    };
  }
  if (action.type === "USER_LOGOUT") {
    return {
      ...state,
      logged: false,
    };
  }
  if (action.type === "POPUP") {
    return {
      ...state,
      popup: { visibility: true, text: action.payload },
    };
  }

  if (action.type === "CLOSE_POPUP") {
    return {
      ...state,
      popup: { visibility: false },
    };
  }

  return state;
};

export default createStore(reductor, devToolsEnhancer());

//export default configureStore(reductor, devToolsEnhancer());
