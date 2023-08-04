import React from "react";
import "./Comment/index.scss";
import { IUser } from "../types/commentType";

interface IProps {
  currentUser: IUser;
}

const AddComment = ({ currentUser }: IProps) => {
  return (
    <div className="add-comment">
      <textarea placeholder="Add a comment.."></textarea>
      <div className={`propic ${currentUser.username}`}></div>
      <button className="btn-send">SEND</button>
    </div>
  );
};

export default AddComment;
