import React, { useEffect, useState } from "react";
import axios from "axios";
import { StoryThumbnail } from "./StoryThumbail";

/**
 * 
 * @param {String} order the property to order the stories by
 */
export const ListStories = () => {
  const [stories, setStories] = useState([]);
  const areStories = stories.length > 0;

  useEffect(() => {
    const fetchStories = () => {
      axios.get('https://us-central1-hacker-news-a2575.cloudfunctions.net/api/getPosts')
        .then((res) => {
          setStories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchStories();
  }, []);

  return (
    <div>
      <ol>
        {areStories ?
          stories.map((story, index) => (
            <li key={index}>
              <StoryThumbnail
                story={story}
                number={index}
              />
            </li>
          )) :
          <p>Oops! There aren't any stories here to display.</p>
        }
      </ol>
    </div>
  )
};

export default ListStories;