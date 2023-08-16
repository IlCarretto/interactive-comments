import React, { useState } from "react";
import { IComment, IUser } from "../../types/commentType";
import "./index.scss";
import CommentVote from "../CommentVote/CommentVote";
import CommentBody from "../CommentBody/CommentBody";
import Actions from "../Actions/Actions";
import Reply from "../Reply.tsx/Reply";
import { AppAction } from "../../reducers/useCommentReducer";
import Modal from "../Modal/Modal";
import AddComment from "../AddComment";

interface IProps {
  comment: IComment;
  currentUser: IUser | null;
  dispatch: React.Dispatch<AppAction>;
}

const Comment = ({ comment, dispatch, currentUser }: IProps) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(
    null
  );

  return (
    <div className="thread-container">
      <div className="comment-container">
        <CommentBody
          comment={comment}
          currentUser={currentUser}
          userData={comment.user}
          createdAt={comment.createdAt}
          content={comment.content}
          isBeingEdited={isBeingEdited}
          setIsBeingEdited={setIsBeingEdited}
          dispatch={dispatch}
        />
        <CommentVote
          score={comment.score}
          id={comment.id}
          dispatch={dispatch}
        />
        <Actions
          commentId={comment.id}
          setReplyingToCommentId={setReplyingToCommentId}
          setIsBeingEdited={setIsBeingEdited}
          userData={comment.user}
          currentUser={currentUser}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      {comment.replies !== null && (
        <div className="reply-container">
          {comment.replies.map((reply) => {
            return (
              <Reply
                setIsModalOpen={setIsModalOpen}
                comment={comment}
                isBeingEdited={isBeingEdited}
                setIsBeingEdited={setIsBeingEdited}
                currentUser={currentUser}
                key={reply.id}
                replyId={reply.id}
                replyData={reply}
                dispatch={dispatch}
              />
            );
          })}
        </div>
      )}
      {comment.id === replyingToCommentId && (
        <AddComment
        setReplyingToCommentId={setReplyingToCommentId}
          userReplyingTo={comment.user.username}
          commentId={comment.id}
          currentUser={currentUser}
          dispatch={dispatch}
        />
      )}
      {isModalOpen && (
        <Modal
          comment={comment}
          dispatch={dispatch}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Comment;
