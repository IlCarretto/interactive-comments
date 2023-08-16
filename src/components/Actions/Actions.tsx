import React from "react";
import "./index.scss";
import { IUser, StateSetter } from "../../types/commentType";

interface IProps {
  currentUser: IUser | null;
  userData: IUser;
  setIsBeingEdited: StateSetter<boolean>;
  setIsModalOpen: StateSetter<boolean>;
  setReplyingToCommentId?: StateSetter<number | null>;
  commentId?: number;
}

const Actions = ({
  currentUser,
  userData,
  setIsBeingEdited,
  setIsModalOpen,
  setReplyingToCommentId,
  commentId,
}: IProps) => {
  const handleReplyClick = () => {
    if (setReplyingToCommentId && commentId) {
      setReplyingToCommentId(commentId);
    }
  };

  return (
    <div className="actions">
      {userData.username !== currentUser?.username ? (
        <button className="btn-reply" onClick={handleReplyClick}>
          <img src="/icon-reply.svg" alt="reply icon" />
          <h4>Reply</h4>
        </button>
      ) : (
        <div className="actions-group">
          <button className="btn-delete" onClick={() => setIsModalOpen(true)}>
            <img src="/icon-delete.svg" alt="delete icon" />
            <h4>Delete</h4>
          </button>
          <button onClick={() => setIsBeingEdited(true)} className="btn-edit">
            <img src="/icon-edit.svg" alt="edit icon" />
            <h4>Edit</h4>
          </button>
        </div>
      )}
    </div>
  );
};

export default Actions;
