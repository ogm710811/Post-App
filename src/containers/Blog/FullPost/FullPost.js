import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    selectedPost: null,
  };
  postId = null;

  // can be different approach to fetch the data in this component
  // 1. using the data that we already have in Blog.js and passing here the selected post.
  // 2. the below approach passing the id and making an http request
  componentDidMount() {
    console.log("[FullPost] componentDidMount :: props", this.props);
    this.loadData();
  }

  componentDidUpdate() {
    console.log("[FullPost] componentDidUpdate :: props", this.props);
    this.loadData();
  }

  loadData = () => {
    if (this.props.match.params.postId) {
      this.postId = this.props.match.params.postId;
      if (
        !this.state.selectedPost ||
        (this.state.selectedPost && this.state.selectedPost.id !== +this.postId)
      ) {
        axios.get(`/jokes/${this.postId}`).then((res) => {
          console.log("get specific joke :::", res);
          this.setState({
            selectedPost: res.data.value,
          });
        });
      }
    }
  };

  deletePostHandler = () => {
    axios.delete(`/posts/${this.postId}`).then((res) => console.log(res));
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    // since the state is updated in an async call wew need to check if both the id and the
    // fetched data is available to render the jsx
    if (this.postId) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }

    if (this.state.selectedPost) {
      let category = this.state.selectedPost.categories[0]
        ? this.state.selectedPost.categories[0]
        : "No Defined Category";

      post = (
        <div className="FullPost">
          <h1>{category}</h1>
          <p>{this.state.selectedPost.joke}</p>
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
