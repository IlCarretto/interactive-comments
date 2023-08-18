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
  const [replyToDelete, setReplyToDelete] = useState<IComment | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);

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
          commentId={comment.id}
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
              <React.Fragment key={reply.id}>
                <Reply
                  setIsModalOpen={setIsModalOpen}
                  comment={comment}
                  isBeingEdited={editingReplyId === reply.id}
                  setIsBeingEdited={() => setEditingReplyId(reply.id)}
                  currentUser={currentUser}
                  replyId={reply.id}
                  replyData={reply}
                  dispatch={dispatch}
                  setReplyToDelete={setReplyToDelete}
                />
                {reply.replies &&
                  reply.replies.map((nestedReply) => {
                    return (
                      <Reply
                        setIsModalOpen={setIsModalOpen}
                        comment={comment}
                        isBeingEdited={isBeingEdited}
                        setIsBeingEdited={setIsBeingEdited}
                        currentUser={currentUser}
                        key={`${reply.id}-${nestedReply.id}`}
                        replyId={reply.id}
                        replyData={nestedReply}
                        dispatch={dispatch}
                        nestedReply={nestedReply}
                        userReplyingTo={reply.user.username}
                      />
                    );
                  })}
              </React.Fragment>
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
          replyData={replyToDelete}
          comment={comment}
          dispatch={dispatch}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default Comment;
