import React from "react";
import { IComment } from "../../types/commentType";
import "./index.scss";
import CommentVote from "../CommentVote/CommentVote";
import CommentBody from "../CommentBody/CommentBody";
import Actions from "../Actions/Actions";
import Reply from "../Reply.tsx/Reply";

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
  return (
    <div className="thread-container">
      <div className="comment-container">
        <CommentBody
          userData={comment.user}
          createdAt={comment.createdAt}
          content={comment.content}
        />
        <CommentVote score={comment.score} />
        <Actions />
      </div>
      {comment.replies !== null && (
        <div className="reply-container">
          {comment.replies.map((reply) => {
            return <Reply key={reply.id} replyData={reply} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
