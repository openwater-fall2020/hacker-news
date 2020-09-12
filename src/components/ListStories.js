import React from "react";
import { StoryThumbnail } from "./StoryThumbail";

export const ListStories = ({ stories }) => {
  const areStories = stories && stories.length > 0
  return (
    <div>
      <ol>
        {areStories ?
          stories.map((story, index) => (
            <li key={index}>
              <StoryThumbnail
                story={story}
              />
            </li>
          )) :
          <p>No posts to see here.</p>
        }
      </ol>
    </div>
  )
};

export default ListStories;