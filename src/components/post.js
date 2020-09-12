import React, { Component } from "react";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      text: "",
    };
  }

  postComment(){
	  alert("Comment Posted!")
	  // TODO
  }
  render() {
    return (
      <form className="submitForm" onSubmit={(e) => {this.postComment()}}>
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
