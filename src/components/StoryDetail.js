import React, { useEffect, useState } from 'react';

import { StoryThumbnail } from "./StoryThumbail";
import { Comment } from "./Comment";

/**
 * 
 * @param {Object} match the url parameter
 * @todo change the mock story to on load fetch the proper story from the DB
 * @todo add comment input state
 */
export const StoryDetail = ({ stories, match }) => {
  const [story, setStory] = useState({});

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


  const thumbnail = () => {
    return (
      <div>
        <StoryThumbnail story={story} />
        <textarea />
        <form method="POST" action="">
          <button>add comment</button>
        </form>
        {
          story.comments &&
          story.comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))
        }
      </div>
    );
  };

  return (
    <div>
      { story.text ? thumbnail() : <p>No post to see here...</p>}
    </div>
  )
};

export default StoryDetail;