import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/auth.js";
import Reset from "./components/reset-password.js";
import EmailSent from "./components/email-sent.js"
import { ListStories } from "./components/ListStories";
import StoryDetail from "./components/StoryDetail.js";
import { Header } from "./components/Header";
import Post from "./components/post.js"
import { Edit } from "./components/Edit";

/**
 * @todo fix loading comments
 */
const App = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchComments = (posts) => {
      if (posts.length > 0) {
        const storiesWithComments = [...posts];
        storiesWithComments.forEach(async (story) => {
          let data;
          try {
            const res = await axios.get(`https://us-central1-hacker-news-a2575.cloudfunctions.net/api/getComments?postID=${story.postID}`)
            data = await res.data;
          } catch (err) {
            console.log(err);
          } finally {
            story.comments = data;
            setStories([...storiesWithComments]);
          }
        });
      }
    };

    const fetchStories = async (cb) => {
      let data;
      try {
        const res = await axios.get('https://us-central1-hacker-news-a2575.cloudfunctions.net/api/getPosts')
        data = await res.data;
      } catch (err) {
        console.log(err);
      } finally {
        cb(data);
      }
    };

    fetchStories(fetchComments);
  }, []);

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
        {stories &&
          <Router>
            <Route
              path="/"
              exact={true}
              render={() => <ListStories stories={stories} />}
            />
            <Route path="/login" render={() => <Login />} />
            <Route path="/forgot" component={Reset} />
            <Route path="/sentemail" component={EmailSent} />
            <Route path="/post" component={Post} />
            <Route
              path="/story/:postID"
              render={({ match }) => <StoryDetail match={match} stories={stories} />}
            />
            <Route
              path="/edit/:postID"
              render={({ match }) => <Edit match={match} stories={stories} />}
            />
          </Router>
        }
      </Container>
    </div>
  );
};

export default App;
