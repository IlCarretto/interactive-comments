import React from "react";
import { IComment } from "../../types/commentType";
import CommentVote from "../CommentVote/CommentVote";
import CommentBody from "../CommentBody/CommentBody";
import Actions from "../Actions/Actions";

interface IProps {
  replyData: IComment;
}

const Reply = ({ replyData }: IProps) => {
  return (
    <div className="reply">
      <CommentBody
        userData={replyData.user}
        createdAt={replyData.createdAt}
        content={replyData.content}
      />
      <CommentVote score={replyData.score} />
      <Actions />
    </div>
  );
};

export default Reply;
