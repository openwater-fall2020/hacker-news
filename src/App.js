import React from "react";
import Login from "./components/auth.js";
import Reset from "./components/reset-password.js";
import EmailSent from "./components/email-sent.js"
import { ListStories } from "./components/ListStories";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/**
 * @todo add a navbar component
 * @todo load posts from the database
 */
const App = () => {
  return (
    <div
      className="App"
      style={{
        height: "100%",
        maxHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <Router>
        <Route path="/" exact={true} component={ListStories} />
        <Route path="/login" component={Login} />
        <Route path="/forgot" component={Reset} />
        <Route path="/sentemail" component={EmailSent} />
      </Router>
    </div>
  );
};

export default App;
