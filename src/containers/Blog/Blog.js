import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    hasCaughtError: false,
  };

  componentDidMount() {
    axios
      .get(`/post`)
      .then((res) => {
        console.log(res.data);
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map((p) => {
          return {
            ...p,
            author: "Orestes",
          };
        });
        this.setState({
          posts: updatedPosts,
          selectedPostId: null,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          hasCaughtError: true,
        });
      });
  }

  selectedPostHandler = (postId) => {
    this.setState({
      selectedPostId: postId,
    });
  };

  render() {
    let posts = (
      <p style={{ textAlign: "center", color: "red" }}>
        There was an error retrieving your posts
      </p>
    );
    if (!this.state.hasCaughtError) {
      posts = this.state.posts.map((p) => (
        <Post
          key={p.id}
          title={p.title}
          author={p.author}
          clicked={() => this.selectedPostHandler(p.id)}
        />
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost postId={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
