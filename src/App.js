import React from "react";
import Login from "./components/auth.js";
import Reset from "./components/reset-password.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
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
        <Route path="/login" component={Login} />
		<Route path="/forgot" component={Reset} />
      </Router>
    </div>
  );
}

export default App;
