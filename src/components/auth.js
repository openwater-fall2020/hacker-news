import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
var passwordHash = require("password-hash");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      l_username: "",
      l_password: "",
      s_username: "",
      s_password: "",
      errorMessage: "Bad Login",
      error: false,
      hashedPassword: "",
      isLoggedIn: false,
    };
    const instance = axios.create({
      baseURL: "https://us-central1-hacker-news-a2575.cloudfunctions.net/api",
      mode: "cors",
    });

    this.axios_instance = instance;
    this.signup = this.signup.bind(this);
  }
  login(e) {
    e.preventDefault();
    this.setState({ error: false });
	//@GAGAN: here we need to retrieve the user's hashed password to verify them
	// and log them in and store it in this.state if that's possible
    console.log(this.state);
    console.log(
      "password:",
      this.state.l_password,
      "hash: ",
      this.state.hashedPassword
    );
    if (passwordHash.verify(this.state.l_password, this.state.hashedPassword)) {
      this.axios_instance
        .post("/loginUser", {
          username: this.state.l_username,
          password: this.state.hashedPassword,
        })
        .then((res) => {
          console.log("res in login: ", res);
          this.setState({ isLoggedIn: true });
        })
        .catch((err) => {
          console.log("error in signup catch: ", err);
          this.setState({ error: true });
        });
    } else {
      console.log(
        "do passwords match?",
        passwordHash.verify(this.state.l_username, this.state.hashedPassword)
      );
      this.setState({ error: true });
    }
  }

  signup(e) {
    e.preventDefault();
    this.setState({ error: false });
	//@GAGAN: here we need to check if user is unique
    var hashedPassword = passwordHash.generate(this.state.s_password);
    console.log("hashedPassword: ", hashedPassword);
    console.log(this.state);
    this.setState({ hashedPassword: hashedPassword });
    this.axios_instance
      .post("/signUpUser", {
        username: this.state.s_username,
        password: this.state.s_password,
      })
      .then((res) => {
        console.log("res in signup: ", res);
      })
      .catch((err) => {
        console.log("error in signup catch: ", err);
        alert("Usernames have to be unique and can only contain letters, digits, dashes and underscores, and should be between 2 and 15 characters long. Please choose another.")
      });
  }

  render() {
    console.log("error: ", this.state.error);
    let error = this.state.error;
    let message;
    if (error) {
      message = <p>Try Again</p>;
    } else {
      message = <br />;
    }
    if (this.state.isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          {message}
          <h3>Login</h3>
          <form
            className="loginForm"
            onSubmit={(e) => {
              this.login(e);
            }}
          >
            <div className="username">
              <label>username: </label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={this.state.l_username}
                placeholder="username"
                onChange={(e) => this.setState({ l_username: e.target.value })}
              />
            </div>
            <div className="password" style={{ paddingBottom: 20 }}>
              <label>password: </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.state.l_password}
                placeholder="password"
                onChange={(e) => this.setState({ l_password: e.target.value })}
              />
            </div>

            <div>
              <Link to="/">
                <input
                  className="ghost-button"
                  type="submit"
                  value="     login     "
                />
              </Link>
            </div>
          </form>
          <br />
          <Link to="/forgot">
            <p> Forgot your password? </p>
          </Link>
          <h3>Create Account </h3>
          <form className="signupForm" onSubmit={(e) => this.signup(e)}>
            <div className="username">
              <label className="col-sm-4 col-form-label">username: </label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={this.state.s_username}
                placeholder="username"
                onChange={(e) => this.setState({ s_username: e.target.value })}
              />
            </div>
            <div className="password" style={{ paddingBottom: 20 }}>
              <label>password: </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.state.s_password}
                placeholder="password"
                onChange={(e) => this.setState({ s_password: e.target.value })}
              />
            </div>
            <div>
              <input
                className="ghost-button"
                type="submit"
                value="   create account   "
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
