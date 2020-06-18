import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import "./Post.css";

const post = (props) => {
  useEffect(() => {
    // passing router properties to the component props
    // between parent and child component
    // using hoc withRouter from react-router-dom
    console.log("[Post] componentDidMount :: props ::", props);
  }, []);

  return (
    <article className="Post" onClick={props.clicked}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  );
};

export default withRouter(post);
