import React from "react";
import "./index.scss";
import { IComment, StateSetter } from "../../types/commentType";
import { AppAction } from "../../reducers/useCommentReducer";
import { DELETE_COMMENT } from "../../actions/comments";

interface IProps {
  comment: IComment;
  setIsModalOpen: StateSetter<boolean>;
  dispatch: React.Dispatch<AppAction>;
}

const Modal = ({ setIsModalOpen, dispatch, comment }: IProps) => {
  const handleDeleteComment = () => {
    dispatch({ type: DELETE_COMMENT, payload: comment });
    setIsModalOpen(false);
  };

  return (
    <div className="modal-container">
      <div className="overlay"></div>
      <div className="modal">
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
