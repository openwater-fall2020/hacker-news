import React from "react";

/**
 * @param {Object} comment
 * @todo add upvote button functionality
 * @todo add comment editing functionality
 */
export const Comment = ({ comment }) => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p style={style.p}>UPVOTE</p>
        <p style={style.p}>{comment.user}</p>
        <p style={style.p}>{comment.date}</p>
      </div>
      <p style={style.p}>{comment.body}</p>
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