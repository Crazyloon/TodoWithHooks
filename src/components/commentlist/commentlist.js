import React from 'react';
import { Comment } from '../comment/comment';

// "owner": "U1",
// "id": "C1",
// "task": "T1",
// "content": "Great Work!"
export const CommentsList = ({ comments }) => {

  return (
    <div className='m-auto'>
      <h5>Comments</h5>
      {comments.map(comment => (
        <div className='comment-card'>
          <Comment key={comment.id} comment={comment} />
        </div>
      ))}

    </div>
  )
}