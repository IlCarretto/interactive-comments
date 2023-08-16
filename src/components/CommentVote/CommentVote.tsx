import React, { useEffect, useState } from "react";
import "./index.scss";
import { AppAction } from "../../reducers/useCommentReducer";
import {
  DOWNVOTE_COMMENT,
  RESET_SCORE,
  UPVOTE_COMMENT,
} from "../../actions/comments";

interface IProps {
  score: number;
  id: number;
  dispatch: React.Dispatch<AppAction>;
}

const CommentVote = ({ score, dispatch, id }: IProps) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [isUpvoteActive, setisUpvoteActive] = useState(false);
  const [isDownvoteActive, setisDownvoteActive] = useState(false);

  const handleUpvote = () => {
    if (hasVoted) {
      dispatch({ type: RESET_SCORE, payload: { commentId: id } });
      setisDownvoteActive(false);
      setisUpvoteActive(false);
      setHasVoted(false);
    } else {
      dispatch({ type: UPVOTE_COMMENT, payload: { commentId: id } });
      setisDownvoteActive(false);
      setisUpvoteActive(true);
      setHasVoted(true);
    }
  };

  const handleDownvote = () => {
    if (hasVoted) {
      dispatch({ type: RESET_SCORE, payload: { commentId: id } });
      setisDownvoteActive(false);
      setisUpvoteActive(false);
      setHasVoted(false);
    } else {
      dispatch({ type: DOWNVOTE_COMMENT, payload: { commentId: id } });
      setisUpvoteActive(false);
      setisDownvoteActive(true);
      setHasVoted(true);
    }
  };

  return (
    <div className="vote">
      <button onClick={handleUpvote}>
        <img
          className={isUpvoteActive ? "voted" : ""}
          src="/icon-plus.svg"
          alt="upvote icon"
        />
      </button>
      <span>{score}</span>
      <button onClick={handleDownvote}>
        <img
          className={isDownvoteActive ? "voted" : ""}
          src="/icon-minus.svg"
          alt="downvote icon"
        />
      </button>
    </div>
  );
};

export default CommentVote;
