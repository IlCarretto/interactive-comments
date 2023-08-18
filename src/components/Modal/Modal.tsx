import React from "react";
import "./index.scss";
import { IComment, StateSetter } from "../../types/commentType";
import { AppAction } from "../../reducers/useCommentReducer";
import { DELETE_COMMENT, DELETE_REPLY } from "../../actions/comments";

interface IProps {
  comment?: IComment;
  setIsModalOpen: StateSetter<boolean>;
  dispatch: React.Dispatch<AppAction>;
  isModalOpen: boolean;
  replyData?: IComment | null;
}

const Modal = ({
  setIsModalOpen,
  dispatch,
  comment,
  isModalOpen,
  replyData,
}: IProps) => {
  const handleDeleteComment = () => {
    if (comment && !replyData) {
      dispatch({ type: DELETE_COMMENT, payload: comment });
    }
    if (replyData) {
      dispatch({ type: DELETE_REPLY, payload: replyData });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="modal-container">
      <div className={`modal-overlay ${isModalOpen ? "active" : ""}`}></div>
      <div className={`modal ${isModalOpen ? "active" : ""}`}>
        <div className="modal-content">
          <h2>Delete comment</h2>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone
          </p>
          <div className="btn-group">
            <button className="btn-undo" onClick={() => setIsModalOpen(false)}>
              NO, CANCEL
            </button>
            <button className="btn-confirmDelete" onClick={handleDeleteComment}>
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
