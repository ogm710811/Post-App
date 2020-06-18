import React, { Component } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    isUserAuth: true,
  };

  render() {
    let routerGuardToNewPost = this.state.isUserAuth ? (
      <Route path="/new-post" component={AsyncNewPost} />
    ) : null;

    return (
      <div>
        <header>
          <nav className="Navbar">
            <ul>
              <li>
                <NavLink to="/posts/" exact activeClassName="my-active">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        {/* Route using render property */}
        {/*<Route path="/" exact render={() => <h1>Home</h1>} />*/}
        {/*<Route path="/" render={() => <h1>Home 2</h1>} />*/}

        {/*<Route path="/" exact component={Posts} />*/}
        {/*<Route path="/new-post" component={NewPost} />*/}
        {/*<Route*/}
        {/*  path="/about"*/}
        {/*  render={() => (*/}
        {/*    <h1>An example how to styling active route with NavLink</h1>*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<Route path="/posts/:postId" component={FullPost} />*/}

        {/* Route using Switch to only load one router at a time */}
        <Switch>
          <Route path="/posts" component={Posts} />
          {routerGuardToNewPost}
          <Route
            path="/about"
            render={() => (
              <h1>An example how to styling active route with NavLink</h1>
            )}
          />
          {/*<Route path="/:postId" component={FullPost} />*/}
          <Redirect from="/" to="/posts" />
          {/*second alternative to redirect to 404 page (not found). No work with <Redirect> component */}
          {/*<Route*/}
          {/*  render={() => (*/}
          {/*    <h1 style={{ textAlign: "center", color: "red" }}>*/}
          {/*      Page not Fount*/}
          {/*    </h1>*/}
          {/*  )}*/}
          {/*/>*/}
        </Switch>
      </div>
    );
  }
}

export default Blog;
