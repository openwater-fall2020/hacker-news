import React from 'react';
import moment from "moment";
import { verifyLogin } from "../cookies";
import axios from 'axios';
import Cookies from 'js-cookie';
import { canDelete } from '../cookies';
/**
 * @param {Object} story a story object
 * @param {Number} number the number to display next to the story
 * @todo user can hide post if logged in
 * @todo clicking upvote button upvotes the post if logged in
 * @todo update upvote to an arrow
 * @todo if not logged in redirect to login page when doing logged-in only functions
 * @todo users can delete their own posts
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

  const formatRelativeDate = (date) => {
    const today = moment(new Date());
    return moment(date).from(today);
  };

  const deletePost = () => {
    if (canDelete(story.postedBy)) {
      try {
        axios.post('https://us-central1-hacker-news-a2575.cloudfunctions.net/api/deletePost', {
          postID: story.postID
        })
          .then((res) => {
            if (res.status === 200) {
              window.location.reload();
            }
          })
      } catch (err) {
        console.log(err);
      };
    };
  };


  const upvotePost = () => {
    console.log('upvoting');
    const upvote = () => {
      try {
        axios.post('https://us-central1-hacker-news-a2575.cloudfunctions.net/api/upvotePost', {
          postID: story.postID,
          uid: Cookies.get('uid'),
          upvotes: 0
        })
          .then((res) => {
            if (res.status === 200) {
              window.location.reload();
            }
          })
      } catch (err) {
        console.log(err);
      }
    };
    verifyLogin(upvote);
  };

  const showDelete = () => {
    if (canDelete(story.postedBy)) {
      return (
        <div style={{ display: 'flex' }}>
          <p style={style.p}>|</p>
          <p
            style={style.pBtn}
            onClick={() => deletePost()}
          >
            delete
        </p>
        </div>
      );
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p
          style={style.p}
          onClick={() => upvotePost()}
        >
          UPVOTE
      </p>
        <a
          style={style.a}
          href={story.url}
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
          {pluralStringAndNum("point", story.upvotes)}
        </p>
        <p style={style.p}>
          {story.postedBy}
        </p>
        <a
          style={style.a}
          href={`/story/${story.postID}`}
        >
          {formatRelativeDate(story.postedAt)}
        </a>
        <p style={style.p}>|</p>
        <a
          style={style.a}
          href={`/story/${story.postID}`}
        >
          {story.comments ? commentString(story.comments.length) : commentString(0)}
        </a>
        {showDelete()}
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
  pBtn: {
    marginRight: '5px',
    marginTop: '0px',
    cursor: 'pointer'
  },
};

export default StoryThumbnail;