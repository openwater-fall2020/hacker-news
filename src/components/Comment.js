import React from "react";
import moment from "moment";
import axios from 'axios';
import { canDelete } from '../cookies';

/**
 * @param {Object} comment
 * @todo add upvote button functionality
 * @todo add comment editing functionality
 */
export const Comment = ({ comment, postID }) => {
  const formatRelativeDate = (date) => {
    const today = moment(new Date());
    return moment(date).from(today);
  };

  const deletePost = () => {
    if (canDelete(comment.postedBy)) {
      try {
        axios.post('https://us-central1-hacker-news-a2575.cloudfunctions.net/api/deleteComment', {
          commentID: comment.commentID,
          postID
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

  const showDelete = () => {
    if (canDelete(comment.postedBy)) {
      return (
        <div style={{ display: 'flex' }}>
          <p style={style.p}>|</p>
          <p
            style={style.p}
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
        <p style={style.p}>{comment.postedBy}</p>
        <p style={style.p}>{formatRelativeDate(comment.createdAt)}</p>
        {showDelete()}
      </div>
      <p style={style.p}>{comment.description}</p>
    </div>
  )
};

const style = {
  p: {
    marginRight: '5px',
    marginTop: '0px'
  },
};

export default Comment;