import React, { useState } from "react";
import "./Comment/index.scss";
import { IUser, StateSetter } from "../types/commentType";
import { AppAction } from "../reducers/useCommentReducer";
import { ADD_COMMENT, ADD_NESTED_REPLY, ADD_REPLY } from "../actions/comments";
import { generateUniqueId } from "../utils/generateUniqueId";

interface IProps {
  currentUser: IUser | null;
  dispatch: React.Dispatch<AppAction>;
  commentId?: number;
  userReplyingTo?: string;
  setReplyingToCommentId?: StateSetter<number | null>;
  parentReplyId?: number;
  setNestedReplyingToComment?: StateSetter<number | null>;
}

const AddComment = ({
  currentUser,
  dispatch,
  commentId,
  userReplyingTo,
  setReplyingToCommentId,
  parentReplyId,
  setNestedReplyingToComment,
}: IProps) => {
  const [newComment, setNewComment] = useState("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSendComment = () => {
    const comment: any = {
      id: generateUniqueId(),
      content: `${
        commentId !== undefined
          ? `@${userReplyingTo} ${newComment}`
          : newComment
      }`,
      createdAt: "now",
      score: 0,
      user: currentUser,
      replies: [],
      initialScore: 0,
    };
    if (newComment !== "") {
      if (commentId !== undefined && setReplyingToCommentId) {
        dispatch({ type: ADD_REPLY, payload: { commentId, comment } });
        setReplyingToCommentId(null);
      } else if (
        commentId !== undefined &&
        parentReplyId !== undefined &&
        setNestedReplyingToComment
      ) {
        const nestedReply: any = {
          id: generateUniqueId(),
          content: `${
            parentReplyId !== undefined
              ? `@${userReplyingTo} ${newComment}`
              : newComment
          }`,
          createdAt: "now",
          score: 0,
          user: currentUser,
          replies: [],
          initialScore: 0,
        };
        dispatch({
          type: ADD_NESTED_REPLY,
          payload: { commentId, parentReplyId, nestedReply },
        });
        setNestedReplyingToComment(null);
      } else {
        dispatch({ type: ADD_COMMENT, payload: comment });
      }
      setNewComment("");
    }
  };

  return (
    <div className="add-comment">
      <textarea
        value={newComment}
        onChange={handleTextareaChange}
        placeholder={
          commentId !== undefined ? "Add a reply.." : "Add a comment.."
        }
      >
        {commentId !== undefined ? userReplyingTo : ""}
      </textarea>
      <div className={`propic ${currentUser && currentUser.username}`}></div>
      <button onClick={handleSendComment} className="btn-send">
        {commentId !== undefined ? "REPLY" : "SEND"}
      </button>
    </div>
  );
};

export default AddComment;
