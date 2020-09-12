import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


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
    /*need to verify user*/
    this.axios_instance
      .post("/loginUser", {
        username: this.state.l_username,
        password: this.state.l_password,
      })
      .then((res) => {
        console.log("res in login: ", res);
        if (res.status === 200) {
          window.location.replace("/");
		  Cookies.set('username', this.state.l_username);
		  Cookies.get();
		  console.log("wtf")
  		  console.log("cookies: ", Cookies.get());
        }
      })
      .catch((err) => {
        console.log("error in login catch: ", err);
        this.setState({ error: true });
      });

  }

  signup(e) {
    e.preventDefault();
    this.setState({ error: false });
    /*here we need to check if user is unique*/
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
        alert(
          "Usernames have to be unique and can only contain letters, digits, dashes and underscores, and should be between 2 and 15 characters long. Please choose another."
        );
      });
  }

  render() {
    let error = this.state.error;
    let message;
    if (error) {
      message = <p>Try Again</p>;
    } else {
      message = <br />;
    }

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
                <input
                  className="ghost-button"
                  type="submit"
                  value="     login     "
                />
            </div>
          </form>
          <br />
          <Link to="/forgot">
            <p> Forgot your password? </p>
          </Link>
          <h3>Create Account </h3>
          <form className="signupForm" onSubmit={(e) => this.signup(e)}>
            <div className="username">
              <label>username: </label>
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
