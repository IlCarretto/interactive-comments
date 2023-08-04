import { useReducer } from "react";
import {
  SET_COMMENTS,
  SET_CURRENTUSER,
  UPVOTE_COMMENT,
} from "../actions/comments";
import { State } from "../types/commentType";

const commentReducer = (state: State, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_COMMENTS:
      return { ...state, comments: payload };
  }
  switch (type) {
    case SET_CURRENTUSER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};

export default commentReducer;
