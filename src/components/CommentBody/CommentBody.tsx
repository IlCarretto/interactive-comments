import React from "react";
import { IUser } from "../../types/commentType";
import "./index.scss";

interface IProps {
  userData: IUser;
  createdAt: string;
  content: string;
}

const CommentBody = ({ userData, createdAt, content }: IProps) => {
  return (
    <div className="content">
      <div className="user">
        <div className={`propic ${userData.username}`}></div>
        <h4>{userData.username}</h4>
        <span>{createdAt}</span>
      </div>
      <div className="text">{content}</div>
    </div>
  );
};

export default CommentBody;
