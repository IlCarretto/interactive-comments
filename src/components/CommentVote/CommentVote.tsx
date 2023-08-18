import React, { useState } from "react";
import "./index.scss";
import { AppAction } from "../../reducers/useCommentReducer";
import {
  DOWNVOTE_COMMENT,
  DOWNVOTE_REPLY,
  RESET_REPLY_SCORE,
  RESET_SCORE,
  UPVOTE_COMMENT,
  UPVOTE_REPLY,
} from "../../actions/comments";

interface IProps {
  replyId?: number;
  score: number;
  commentId?: number;
  dispatch: React.Dispatch<AppAction>;
}

const CommentVote = ({ score, dispatch, commentId, replyId }: IProps) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [isUpvoteActive, setisUpvoteActive] = useState(false);
  const [isDownvoteActive, setisDownvoteActive] = useState(false);

  const handleUpvote = () => {
    if (commentId && !replyId) {
      if (hasVoted) {
        dispatch({ type: RESET_SCORE, payload: { commentId: commentId } });
        setisDownvoteActive(false);
        setisUpvoteActive(false);
        setHasVoted(false);
      } else {
        dispatch({ type: UPVOTE_COMMENT, payload: { commentId: commentId } });
        setisDownvoteActive(false);
        setisUpvoteActive(true);
        setHasVoted(true);
      }
    }
    if (replyId && commentId) {
      if (hasVoted) {
        dispatch({
          type: RESET_REPLY_SCORE,
          payload: { commentId: commentId, replyId: replyId },
        });
        setisDownvoteActive(false);
        setisUpvoteActive(false);
        setHasVoted(false);
      } else {
        dispatch({
          type: UPVOTE_REPLY,
          payload: { commentId: commentId, replyId: replyId },
        });
        setisDownvoteActive(false);
        setisUpvoteActive(true);
        setHasVoted(true);
      }
    }
  };

  const handleDownvote = () => {
    if (commentId && !replyId) {
      if (hasVoted) {
        dispatch({ type: RESET_SCORE, payload: { commentId: commentId } });
        setisDownvoteActive(false);
        setisUpvoteActive(false);
        setHasVoted(false);
      } else {
        dispatch({ type: DOWNVOTE_COMMENT, payload: { commentId: commentId } });
        setisUpvoteActive(false);
        setisDownvoteActive(true);
        setHasVoted(true);
      }
    }
    if (replyId && commentId) {
      if (hasVoted) {
        dispatch({
          type: RESET_REPLY_SCORE,
          payload: { commentId: commentId, replyId: replyId },
        });
        setisDownvoteActive(false);
        setisUpvoteActive(false);
        setHasVoted(false);
      } else {
        dispatch({
          type: DOWNVOTE_REPLY,
          payload: { commentId: commentId, replyId: replyId },
        });
        setisUpvoteActive(false);
        setisDownvoteActive(true);
        setHasVoted(true);
      }
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
