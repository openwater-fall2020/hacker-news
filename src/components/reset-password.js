import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  render() {
    return (
      <div>
        <h3> Reset your password </h3>
        <form className="resetForm" onSubmit={console.log("fuck")}>
          <div class="reset password" style={{ paddingBottom: 20 }}>
            <label className="col-sm-4 col-form-label">username: </label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={this.state.username}
              placeholder="username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>

          <div>
            <Link to="/sentemail">
              <input
                className="ghost-button"
                type="submit"
                value=" Send reset email "
              />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
