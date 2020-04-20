import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment } from '../comment/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import * as constants from '../../store/constants';


export const CommentsList = ({ comments, taskId }) => {

  let [newComment, setNewCommentData] = useState({});
  let currentUser = useSelector(state => state.session.id);

  return (
    <div className='m-auto'>
      <h5>Comments</h5>
      <h6>
        <code>
          {newComment ? Object.keys(newComment).map((v, i) => (
            <div>
              {v}: {v === 'date' ? newComment[v].toString() : newComment[v]}
            </div>
          )) : null}
        </code>
      </h6>
      {comments.map(comment => (
        <div className='comment-card'>
          <Comment key={comment.id} comment={comment} />
        </div>
      ))}
      {
        newComment && newComment.id ?
          <div className='comment-card comment-card-edit'>
            <Comment comment={newComment} mode={constants.COMMENT_RENDER_MODE.NEW}
              handleSetCommentData={setNewCommentData}
            />
          </div>
          : null
      }
      <button className='btn btn-primary btn-sm mt-2'
        onClick={(e) => setNewCommentData({
          id: uuid(),
          task: taskId,
          owner: currentUser,
          content: '',
          date: new Date()
        })}>
        <FontAwesomeIcon icon={faCommentMedical} /> Comment
      </button>
    </div>
  )
}