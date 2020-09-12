import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { verifyLogin } from "../cookies";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      text: "",
    };
  }

  postComment(e) {
    e.preventDefault();
    const createComment = () => {
      try {
        axios.post('https://us-central1-hacker-news-a2575.cloudfunctions.net/api/uploadPost', {
          username: Cookies.get('username'),
          title: this.state.title,
          url: this.state.url,
          text: this.state.text

        })
          .then((res) => {
            if (res.status === 200) {
              window.location.replace('/');
            };
          })
      } catch (err) {
        console.log(err);
      }
    };
    verifyLogin(createComment);
  }
  render() {
    return (
      <form className="submitForm" onSubmit={(e) => { this.postComment(e) }}>
        <div className="title">
          <label> title </label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </div>
        <div className="url">
          <label> url </label>
          <input
            className="form-control"
            type="text"
            name="url"
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
          />
        </div>
        <h3 style={{ color: "grey" }}> or </h3>
        <div className="url">
          <label> text </label>
          <textarea
            className="form-control"
            type="textarea"
            name="text"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        </div>
        <br />
        <input className="ghost-button" type="submit" value=" submit  " />
      </form>
    );
  }
}
