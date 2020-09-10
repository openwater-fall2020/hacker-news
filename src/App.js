import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ListStories } from "./components/ListStories";

/**
 * @todo add a navbar component
 * @todo load posts from the database
 */
const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact={true} component={ListStories} />
      </Router>
    </div>
  );
};

export default App;
