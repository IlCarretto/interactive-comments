import React, { useState } from "react";
import { IComment, IUser, StateSetter } from "../../types/commentType";
import CommentVote from "../CommentVote/CommentVote";
import CommentBody from "../CommentBody/CommentBody";
import Actions from "../Actions/Actions";
import { AppAction } from "../../reducers/useCommentReducer";
import AddComment from "../AddComment";

interface IProps {
  replyData: IComment;
  currentUser: IUser | null;
  replyId: number;
  dispatch: React.Dispatch<AppAction>;
  setIsBeingEdited: React.Dispatch<React.SetStateAction<boolean>>;
  isBeingEdited: boolean;
  comment: IComment;
  setIsModalOpen: StateSetter<boolean>;
  nestedReply?: IComment;
  userReplyingTo?: string;
  setReplyToDelete?: StateSetter<IComment | null>;
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
  setReplyToDelete,
}: IProps) => {
  const [nestedReplyingToComment, setNestedReplyingToComment] = useState<
    number | null
  >(null);

  return (
    <>
      <div className="reply">
        <CommentBody
          replyData={replyData}
          comment={comment}
          dispatch={dispatch}
          isBeingEdited={isBeingEdited}
          setIsBeingEdited={setIsBeingEdited}
          currentUser={currentUser}
          userData={replyData.user}
          createdAt={replyData.createdAt}
          content={replyData.content}
        />
        <CommentVote
          score={replyData.score}
          dispatch={dispatch}
          commentId={comment.id}
          replyId={replyId}
        />
        <Actions
          setReplyToDelete={setReplyToDelete}
          replyData={replyData}
          replyId={replyId}
          setNestedReplyingToComment={setNestedReplyingToComment}
          setIsModalOpen={setIsModalOpen}
          setIsBeingEdited={setIsBeingEdited}
          currentUser={currentUser}
          userData={replyData.user}
        />
      </div>
      {replyId === nestedReplyingToComment && (
        <AddComment
          currentUser={currentUser}
          commentId={comment.id}
          parentReplyId={replyId}
          dispatch={dispatch}
          userReplyingTo={replyData.user.username}
          setNestedReplyingToComment={setNestedReplyingToComment}
        />
      )}
    </>
  );
};

export default Reply;
