import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

// AXIOS GLOBALS
/*axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";*/

axios.defaults.baseURL = "http://api.icndb.com";

// AXIOS INTERCEPTORS
axios.interceptors.request.use(
  (request) => {
    // console.log("axios interceptor request ::", request);
    return request;
  },
  (error) => {
    // console.log("axios interceptor request error ::", error);
    return Promise.reject(error);
  }
);

// How to remove axios interceptors
// var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);

axios.interceptors.response.use(
  (response) => {
    // console.log("axios interceptor response ::", response);
    return response;
  },
  (error) => {
    // console.log("axios interceptor response error ::", error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
