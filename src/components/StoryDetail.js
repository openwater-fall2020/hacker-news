import React, { useEffect, useState } from 'react';

import { StoryThumbnail } from "./StoryThumbail";
import { Comment } from "./Comment";

const story = {
  id: 0,
  link: 'https://blog.ltse.com/the-long-term-stock-exchange-opens-for-business-38b13f51e87b',
  title: 'The Long-Term Stock Exchange Opens for Business',
  points: 384,
  author: 'ummonk',
  date: '4 hours ago',
  comments: [
    {
      id: 0,
      user: 'eries',
      date: '2 hours ago',
      body: 'Hey everyone, Eric Ries here. Happy to answer questions if you’d like to learn more about what we are building at LTSE'
    },
    {
      id: 1,
      user: 'baccreddited',
      date: '12 minutes ago',
      body: 'Many private companies are staying private for longer, with an average time from launch to IPO creeping up toward 10 years or more. Most unaccredited investors are missing all of those substantial early gains. Does LTSE have any plans to help speed the path to IPO and let more unaccredited investors participate in early growth and success?',
    },
  ],
};

/**
 * 
 * @param {Object} match the url parameter
 * @todo change the mock story to on load fetch the proper story from the DB
 * @todo add comment input state
 */
export const StoryDetail = ({ match }) => {
  return (
    <div>
      <StoryThumbnail story={story} />
      <textarea />
      <form method="POST" action="">
        <button>add comment</button>
      </form>
      {story.comments &&
        story.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))
      }
    </div>
  )
};

export default StoryDetail;