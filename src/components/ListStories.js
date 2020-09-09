import React from "react";
import { StoryThumbnail } from "./StoryThumbail";

const mockStories = [
  {
    id: 0,
    link: 'https://blog.ltse.com/the-long-term-stock-exchange-opens-for-business-38b13f51e87b',
    title: 'The Long-Term Stock Exchange Opens for Business',
    points: 384,
    author: 'ummonk',
    date: '4 hours ago',
    comments: [
      // {
      //   id: 0,
      //   user: 'eries',
      //   date: '2 hours ago',
      //   body: 'Hey everyone, Eric Ries here. Happy to answer questions if you’d like to learn more about what we are building at LTSE'
      // },
      // {
      //   id: 1,
      //   user: 'baccreddited',
      //   date: '12 minutes ago',
      //   body: 'Many private companies are staying private for longer, with an average time from launch to IPO creeping up toward 10 years or more. Most unaccredited investors are missing all of those substantial early gains. Does LTSE have any plans to help speed the path to IPO and let more unaccredited investors participate in early growth and success?',
      // },
    ],
  },
];

/**
 * 
 * @param {Object[]} stories a list of story objects
 * @todo replace mockStories with stories from the database
 * @todo take in a prop that we can sort by
 * @todo can go to the detail page by clicking on either the time posted or the comment
 */
export const ListStories = ({ stories }) => {
  const areStories = mockStories.length > 0;
  return (
    <div>
      <ol>
        {areStories ?
          mockStories.map((story, index) => (
            <li>
              <StoryThumbnail
                story={story}
                key={index}
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