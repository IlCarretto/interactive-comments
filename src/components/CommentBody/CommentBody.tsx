import React, { useState } from "react";
import { IComment, IUser } from "../../types/commentType";
import "./index.scss";
import { AppAction } from "../../reducers/useCommentReducer";
import { UPDATE_COMMENT } from "../../actions/comments";

interface IProps {
  userData: IUser;
  currentUser: IUser | null;
  createdAt: string;
  content: string;
  isBeingEdited: boolean;
  setIsBeingEdited: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<AppAction>;
  comment: IComment;
}

const CommentBody = ({
  userData,
  createdAt,
  content,
  currentUser,
  isBeingEdited,
  dispatch,
  comment,
  setIsBeingEdited,
}: IProps) => {
  const [commentContent, setCommentContent] = useState(content);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleEditClick = () => {
    if (content !== commentContent) {
      dispatch({ type: UPDATE_COMMENT, payload: comment });
    }
    setIsBeingEdited(false);
  };

  return (
    <div className="content">
      <div className="user">
        <div className={`propic ${userData.username}`}></div>
        <h4>{userData.username}</h4>
        {userData.username === currentUser?.username && (
          <div className="user-tag">
            <span>you</span>
          </div>
        )}
        <span>{createdAt}</span>
      </div>
      {isBeingEdited ? (
        <>
          <textarea
            className="editable-textarea"
            value={commentContent}
            onChange={handleTextareaChange}
          >
            {commentContent}
          </textarea>
          <div className="btn-group">
            <button className="btn-update" onClick={handleEditClick}>
              UPDATE
            </button>
          </div>
        </>
      ) : (
        <div className="text">{commentContent}</div>
      )}
    </div>
  );
};

export default CommentBody;
