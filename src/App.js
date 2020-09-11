import React from "react";
import Login from "./components/auth.js";
import Reset from "./components/reset-password.js";
import EmailSent from "./components/email-sent.js"
import { ListStories } from "./components/ListStories";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StoryDetail from "./components/StoryDetail.js";
import { Header } from "./components/Header";
import { Container } from "react-bootstrap";

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
      <Header />
      <Container style={{ paddingLeft: '0px', backgroundColor: '#f6f6ef', height: '95%' }}>
        <Router>
          <Route
            path="/"
            exact={true}
            render={() => <ListStories />}
          />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={Reset} />
          <Route path="/sentemail" component={EmailSent} />
          <Route path="/story/:id" component={StoryDetail} />
        </Router>
      </Container>
    </div>
  );
};

export default App;
