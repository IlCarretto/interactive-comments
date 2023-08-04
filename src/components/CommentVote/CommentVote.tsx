import React from "react";
import "./index.scss";

interface IProps {
  score: number;
}

const CommentVote = ({ score }: IProps) => {
  return (
    <div className="vote">
      <img src="/icon-plus.svg" alt="upvote icon" />
      <span>{score}</span>
      <img src="/icon-minus.svg" alt="downvote icon" />
    </div>
  );
};

export default CommentVote;
