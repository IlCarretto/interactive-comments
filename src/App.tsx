  import React, { useState, useEffect, useReducer } from "react";
  import "./App.css";
  import axios from "axios";
  import Comment from "./components/Comment/Comment";
  import { IComment, State } from "./types/commentType";
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
        const comments = resp.data.comments.map((comment: IComment) => ({
          ...comment,
          initialScore: comment.score,
        }));
        dispatch({ type: SET_COMMENTS, payload: comments });
        dispatch({ type: SET_CURRENTUSER, payload: resp.data.currentUser });
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      getData();
    }, []);

    const { comments, currentUser } = state;

    return (
      <div className="App">
        {comments.map((comment) => (
          <>
            <Comment
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              dispatch={dispatch}
            />
          </>
        ))}
        <AddComment currentUser={currentUser} dispatch={dispatch} />
      </div>
    );
  }

  export default App;
