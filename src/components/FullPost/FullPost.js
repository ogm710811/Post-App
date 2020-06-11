import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    selectedPost: null,
  };

  // can be different approach to fetch the data in this component
  // 1. using the data that we already have in Blog.js and passing here the selected post.
  // 2. the below approach passing the id and making an http request
  componentDidUpdate() {
    if (!this.props.postId) return;
    if (
      this.state.selectedPost &&
      this.state.selectedPost.id === this.props.postId
    )
      return;
    axios.get(`/posts/${this.props.postId}`).then((res) => {
      console.log(res);
      this.setState({
        selectedPost: res.data,
      });
    });
  }

  deletePostHandler = () => {
    axios.delete(`/posts/${this.props.postId}`).then((res) => console.log(res));
  };

  render() {
    console.log(this.props);
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    // since the state is updated in an async call wew need to check if both the id and the
    // fetched data is available to render the jsx
    if (this.props.postId && this.state.selectedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.selectedPost.title}</h1>
          <p>{this.state.selectedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
