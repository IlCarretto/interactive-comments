import {
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  DOWNVOTE_COMMENT,
  RESET_SCORE,
  SET_COMMENTS,
  SET_CURRENTUSER,
  UPDATE_COMMENT,
  UPVOTE_COMMENT,
} from "../actions/comments";
import { IComment, IUser, State } from "../types/commentType";

export type AppAction =
  | { type: typeof SET_COMMENTS; payload: IComment[] }
  | { type: typeof SET_CURRENTUSER; payload: IUser | null }
  | { type: typeof UPVOTE_COMMENT; payload: { commentId: number } }
  | { type: typeof DOWNVOTE_COMMENT; payload: { commentId: number } }
  | { type: typeof RESET_SCORE; payload: { commentId: number } }
  | { type: typeof ADD_COMMENT; payload: IComment }
  | { type: typeof UPDATE_COMMENT; payload: IComment }
  | { type: typeof DELETE_COMMENT; payload: IComment }
  | {
      type: typeof ADD_REPLY;
      payload: { commentId: number; comment: IComment };
    };

const commentReducer = (state: State, action: AppAction) => {
  const { payload, type } = action;
  switch (type) {
    case SET_COMMENTS:
      return { ...state, comments: payload };
    case SET_CURRENTUSER:
      return { ...state, currentUser: payload };
    case UPVOTE_COMMENT:
      const upvotedComment = state.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          return { ...comment, score: comment.score + 1 };
        }
        return comment;
      });
      return { ...state, comments: upvotedComment };
    case DOWNVOTE_COMMENT:
      const downvotedComment = state.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          return { ...comment, score: comment.score - 1 };
        }
        return comment;
      });
      return { ...state, comments: downvotedComment };
    case RESET_SCORE:
      const resettedComment = state.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          return { ...comment, score: comment.initialScore };
        }
        return comment;
      });
      return { ...state, comments: resettedComment };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, payload] };
    case UPDATE_COMMENT:
      const updatedComments = state.comments.map((comment) =>
        comment.id === payload.id ? payload : comment
      );
      return { ...state, comments: updatedComments };
    case DELETE_COMMENT:
      const filteredComments = state.comments.filter(
        (comment) => comment.id !== payload.id
      );
      return { ...state, comments: filteredComments };
    case ADD_REPLY:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === payload.commentId) {
            return {
              ...comment,
              replies: [...comment.replies, payload.comment],
            };
          }
          return comment;
        }),
      };
    default:
      return state;
  }
};

export default commentReducer;
