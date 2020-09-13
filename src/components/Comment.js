import React from "react";
import moment from "moment";

/**
 * @param {Object} comment
 * @todo add upvote button functionality
 * @todo add comment editing functionality
 */
export const Comment = ({ comment }) => {
  const formatRelativeDate = (date) => {
    const today = moment(new Date());
    return moment(date).from(today);
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p style={style.p}>UPVOTE</p>
        <p style={style.p}>{comment.postedBy}</p>
        <p style={style.p}>{formatRelativeDate(comment.createdAt)}</p>
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