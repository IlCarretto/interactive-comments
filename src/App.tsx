import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import axios from "axios";
import Comment from "./components/Comment/Comment";
import { IComment, IUser, State } from "./types/commentType";
import AddComment from "./components/AddComment";
import { SET_COMMENTS, SET_CURRENTUSER } from "./actions/comments";
import commentReducer from "./reducers/useCommentReducer";

function App() {
  const initialState: State = {
    comments: [],
    currentUser: {
      image: { png: "", webp: "" },
      username: "",
    },
  };

  const [state, dispatch] = useReducer(commentReducer, initialState);

  const getData = async () => {
    try {
      const resp = await axios.get("./data/data.json");
      dispatch({ type: SET_COMMENTS });
      dispatch({ type: SET_CURRENTUSER });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { comments, currentUser } = initialState;

  return (
    <div className="App">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <AddComment currentUser={currentUser} />
    </div>
  );
}

export default App;
