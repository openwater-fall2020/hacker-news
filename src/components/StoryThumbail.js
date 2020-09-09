import React from 'react';

/**
 * @param {Object} story a story object
 * @param {Number} number the number to display next to the story
 * @todo user can hide post if logged in
 * @todo clicking on comments switches to detailed view
 * @todo clicking upvote button upvotes the post if logged in
 * @todo clicking the author's name links to their page
 * @todo update upvote to an arrow
 */
export const StoryThumbnail = ({ story }) => {
  const pluralStringAndNum = (str, num) => {
    if (num > 1) return `${num} ${str}s`;
    else return `${num} ${str}`;
  };

  const commentString = (num) => {
    if (num === 0) return "discuss";
    else return pluralStringAndNum('comment', num);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p style={style.p}>
          UPVOTE
        </p>
        <a
          style={style.a}
          href={story.link}
        >
          {story.title}
        </a>
      </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        <p style={style.p}>
          {pluralStringAndNum("point", story.points)}
        </p>
        <a
          href="#"
          style={style.a}
        >
          {story.author}
        </a>
        <a
          style={style.a}
          href="#"
        >
          {story.date}
        </a>
        <p style={style.p}>|</p>
        <p style={style.p}>hide</p>
        <p style={style.p}>|</p>
        <a
          style={style.a}
          href="#"
        >
          {commentString(story.comments.length)}
        </a>
      </div>
    </div>
  )
};

const style = {
  a: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: '5px'
  },
  p: {
    marginRight: '5px',
    marginTop: '0px'
  },
};

export default StoryThumbnail;