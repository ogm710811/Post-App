import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";

import Post from "../../../components/Post/Post";
import "./Posts.css";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: [],
    hasCaughtError: false,
  };

  componentDidMount() {
    console.log("[Posts] componentDidMount :: props ::", this.props);

    axios
      .get("/jokes")
      .then((res) => {
        const posts = res.data.value.slice(0, 8);
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
    // this.setState({
    //   selectedPostId: postId,
    // });
    this.props.history.push({
      pathname: "/posts/" + postId,
    });
    // this.props.history.push('/posts/' + postId)
  };

  render() {
    let posts = (
      <p style={{ textAlign: "center", color: "red" }}>
        There was an error retrieving your posts
      </p>
    );
    if (!this.state.hasCaughtError) {
      posts = this.state.posts.map((p) => (
        // <Link to={"/posts" + p.id} key={p.id}>
        <Post
          key={p.id}
          title={p["categories"][0]}
          author={p.author}
          clicked={() => {
            this.selectedPostHandler(p.id);
          }}
        />
        // </Link>
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + "/:postId"} component={FullPost} />
      </div>
    );
  }
}

export default Posts;
