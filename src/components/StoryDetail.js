import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from "axios";

import { StoryThumbnail } from "./StoryThumbail";
import { Comment } from "./Comment";
import { verifyLogin } from "../cookies";

/**
 * @param {Array} stories 
 * @param {Object} match the url parameter
 * @todo if not logged in, add comment redirects user to login page
 */
export const StoryDetail = ({ stories, match }) => {
  const [story, setStory] = useState({});
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const filterStory = () => {
      const currentStory = stories.filter((story) => {
        return story.postID === match.params.postID;
      });
      if (currentStory.length === 1) {
        setStory(currentStory[0]);
      };
    };
    filterStory();
  }, [stories, match]);

  const createComment = () => {
    const postComment = () => {
      try {
        axios.post('https://us-central1-hacker-news-a2575.cloudfunctions.net/api/postComments', {
          username: Cookies.get('username'),
          description: commentInput,
          postID: story.postID
        })
          .then((res) => {
            if (res.status === 200) {
              window.location.reload();
            }
          });
      } catch (err) {
        console.log(err);
      };
    };
    verifyLogin(postComment);
  };

  const thumbnail = () => {
    return (
      <div>
        <StoryThumbnail story={story} />
        <textarea onChange={(e) => setCommentInput(e.target.value)} />
        <button
          onClick={() => createComment()}
        >
          add comment
          </button>
        {
          story.comments &&
          story.comments.map((comment, index) => (
            <Comment key={index} comment={comment} postID={story.postID} />
          ))
        }
      </div>
    );
  };

  return (
    <div>
      { (story.text || story.url) ? thumbnail() : <p>No post to see here...</p>}
    </div>
  )
};

export default StoryDetail;