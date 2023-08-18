import {
  ADD_COMMENT,
  ADD_NESTED_REPLY,
  ADD_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
  DOWNVOTE_COMMENT,
  DOWNVOTE_REPLY,
  RESET_REPLY_SCORE,
  RESET_SCORE,
  SET_COMMENTS,
  SET_CURRENTUSER,
  UPDATE_COMMENT,
  UPDATE_REPLY,
  UPVOTE_COMMENT,
  UPVOTE_REPLY,
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
    }
  | {
      type: typeof UPVOTE_REPLY;
      payload: { commentId: number; replyId: number };
    }
  | {
      type: typeof RESET_REPLY_SCORE;
      payload: { commentId: number; replyId: number };
    }
  | {
      type: typeof DOWNVOTE_REPLY;
      payload: { commentId: number; replyId: number };
    }
  | {
      type: typeof ADD_NESTED_REPLY;
      payload: {
        commentId: number;
        parentReplyId: number;
        nestedReply: IComment;
      };
    }
  | {
      type: typeof UPDATE_REPLY;
      payload: { commentId: number; reply: IComment };
    }
  | {
      type: typeof DELETE_REPLY;
      payload: IComment;
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
    case UPVOTE_REPLY:
      const updatedUpvotedReplies = state.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          const upvotedReplies = comment.replies.map((reply) => {
            if (reply.id === payload.replyId) {
              return { ...reply, score: reply.score + 1 };
            }
            return reply;
          });
          return { ...comment, replies: upvotedReplies };
        }
        return comment;
      });
      return {
        ...state,
        comments: updatedUpvotedReplies,
      };
    case DOWNVOTE_REPLY:
      const updatedDownvotedReplies = state.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          const downvotedReplies = comment.replies.map((reply) => {
            if (reply.id === payload.replyId) {
              return { ...reply, score: reply.score - 1 };
            }
            return reply;
          });
          return { ...comment, replies: downvotedReplies };
        }
        return comment;
      });
      return {
        ...state,
        comments: updatedDownvotedReplies,
      };
    case RESET_REPLY_SCORE:
      const updatedResettedReply = state.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === payload.replyId) {
              if (!reply.initialScore) {
                if (reply.user.username === "ramsesmiron") {
                  return { ...reply, score: 4 };
                } else {
                  return { ...reply, score: 2 };
                }
              } else {
                return { ...reply, score: reply.initialScore };
              }
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      });
      return { ...state, comments: updatedResettedReply };
    case ADD_NESTED_REPLY:
      const updatedCommentsWithNestedReplies = state.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          const updatedWithNestedReplies = comment.replies.map((reply) => {
            if (reply.id === payload.parentReplyId) {
              if (reply.replies) {
                return {
                  ...reply,
                  replies: [...reply.replies, payload.nestedReply],
                };
              }
            }
            return reply;
          });
          return { ...comment, replies: updatedWithNestedReplies };
        }
        return comment;
      });
      return {
        ...state,
        comments: updatedCommentsWithNestedReplies,
      };
    case UPDATE_REPLY:
      const updatedCommentWithContentReplies = state.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          const updatedContentReplies = comment.replies.map((reply) => {
            return reply.id === payload.reply.id ? payload.reply : reply;
          });
          return { ...comment, replies: updatedContentReplies };
        }
        return comment;
      });
      return {
        ...state,
        comments: updatedCommentWithContentReplies,
      };
    case DELETE_REPLY:
      const updatedCommentsWithFilteredReplies = state.comments.map(
        (comment) => {
          const filteredReplies = comment.replies.filter(
            (reply) => reply.id !== payload.id
          );
          return { ...comment, replies: filteredReplies };
        }
      );
      return { ...state, comments: updatedCommentsWithFilteredReplies };
    default:
      return state;
  }
};

export default commentReducer;
