import React, { useEffect, useState } from "react";
import axios from "axios";

import { verifyLogin } from "../cookies";

export const Edit = ({ match, stories }) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState({});
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const findStory = () => {
      const story = stories.find((story) => story.postID === match.params.postID);
      if (story) {
        setStory(story);
        setTitle(story.title);
        setText(story.text);
        setUrl(story.url);
      }
    };
    findStory();
  }, [match.params.postID, stories]);

  const postComment = (e) => {
    if (story) {
      e.preventDefault();
      const createPost = () => {
        try {
          axios.post('https://us-central1-hacker-news-a2575.cloudfunctions.net/api/updatePost', {
            postID: story.postID,
            title,
            url,
            text
          })
            .then((res) => {
              if (res.status === 200) {
                window.location.replace('/');
              };
            })
        } catch (err) {
          console.log(err);
        }
      };
      verifyLogin(createPost);
    };
  };

  return (
    <form className="submitForm" onSubmit={(e) => { postComment(e) }}>
      <div className="title">
        <label> title </label>
        <input
          className="form-control"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="url">
        <label> url </label>
        <input
          className="form-control"
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <h3 style={{ color: "grey" }}> or </h3>
      <div className="url">
        <label> text </label>
        <textarea
          className="form-control"
          type="textarea"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <br />
      <input className="ghost-button" type="submit" value=" update " />
    </form>
  );
};
