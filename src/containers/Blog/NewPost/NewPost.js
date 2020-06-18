import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    author: "Orestes",
    isPostSubmitted: false,
    isUserAuth: true,
  };

  componentDidMount() {
    console.log("[NewPost] componentDidMount :: props ::", this.props);

    // an alternative to use conditions to a router guard we can use history.replace
    // in componentDidMount() to redirect to home page. example below:
    if (!this.state.isUserAuth) this.props.history.replace("/posts");
  }

  newPostHandler = () => {
    const newPost = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
    };
    axios
      .post(`/posts`, newPost)
      .then((res) => {
        console.log(res);
        this.setState({
          isPostSubmitted: true,
        });
        /*** another 2 ways to redirect ***/
        // 1. using the history property of the router and push method (allow browser back button to return)
        // this.props.history.push("/posts");
        // 2. using the history property of the router and replace (like <Redirect> component (no allow browser back button)
        // this.props.history.replace('/posts')
      })
      .catch((error) => {
        this.setState({
          isPostSubmitted: false,
        });
      });
  };

  render() {
    let redirectToPosts = this.state.isPostSubmitted ? (
      <Redirect to="/posts" />
    ) : null;

    return (
      <div className="NewPost">
        {redirectToPosts}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.body}
          onChange={(event) => this.setState({ body: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={(event) => this.setState({ author: event.target.value })}
        >
          <option value="Orestes">Orestes</option>
          <option value="Blanca">Blanca</option>
        </select>
        <button onClick={this.newPostHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
