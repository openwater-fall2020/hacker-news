import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

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
  }

  login(username, password) {

  }

  signup() {

  }
  render() {
	  console.log(this.state.error)
	  let error = this.state.error;
	  let message;
	  if(error){
		  message = <p>Bad Login</p>;
	  }
	  else{
		  message = <br/>;
	  }
    return (
      <div>
	  {message}
        <h3>Login</h3>
        <form
          className="loginForm"
          onSubmit={()=>{this.login(this.state.l_username, this.state.l_password); }}
        >
          <div class="username">
            <label className="col-sm-4 col-form-label">username: </label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={this.state.l_username}
              placeholder="username"
              onChange={(e) => this.setState({ l_username: e.target.value })}
            />
          </div>
          <div class="password" style={{ paddingBottom: 20 }}>
            <label>password: </label>
            <input
              className="form-control"
              type="password"
			  secureTextEntry={true}
              name="password"
              value={this.state.l_password}
              placeholder="password"
              onChange={(e) => this.setState({ l_password: e.target.value })}
            />
          </div>

          <div>
            <input className="ghost-button" type="submit" value="   login   " />
          </div>

        </form>
		<Link to="/forgot">
		  <p> Forgot your password? </p>
		</Link>
        <h3>Create Account </h3>
        <form className="signupForm" onSubmit={()=>{this.signup();}}>
          <div class="username">
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
          <div class="password" style={{ paddingBottom: 20 }}>
            <label>password: </label>
            <input
              className="form-control"
              type="password"
              name="password"
			  secureTextEntry={true}
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
