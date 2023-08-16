import React from "react";
import { IComment, IUser, StateSetter } from "../../types/commentType";
import CommentVote from "../CommentVote/CommentVote";
import CommentBody from "../CommentBody/CommentBody";
import Actions from "../Actions/Actions";
import { AppAction } from "../../reducers/useCommentReducer";

interface IProps {
  replyData: IComment;
  currentUser: IUser | null;
  replyId: number;
  dispatch: React.Dispatch<AppAction>;
  setIsBeingEdited: React.Dispatch<React.SetStateAction<boolean>>;
  isBeingEdited: boolean;
  comment: IComment;
  setIsModalOpen: StateSetter<boolean>;
}

const Reply = ({
  replyData,
  dispatch,
  replyId,
  currentUser,
  setIsBeingEdited,
  isBeingEdited,
  comment,
  setIsModalOpen,
}: IProps) => {
  return (
    <div className="reply">
      <CommentBody
        comment={comment}
        dispatch={dispatch}
        isBeingEdited={isBeingEdited}
        setIsBeingEdited={setIsBeingEdited}
        currentUser={currentUser}
        userData={replyData.user}
        createdAt={replyData.createdAt}
        content={replyData.content}
      />
      <CommentVote score={replyData.score} dispatch={dispatch} id={replyId} />
      <Actions
        setIsModalOpen={setIsModalOpen}
        setIsBeingEdited={setIsBeingEdited}
        currentUser={currentUser}
        userData={replyData.user}
      />
    </div>
  );
};

export default Reply;
