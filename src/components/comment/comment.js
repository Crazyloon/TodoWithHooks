import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faClock, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import * as moment from 'moment';
import * as constants from '../../store/constants';
import { SaveButtons } from './savebuttons';

export const Comment = ({ comment, mode, handleSetCommentData }) => {
  const [commentRenderMode, setCommentRenderMode] = useState(mode);
  const [editedComment, setEditedCommentData] = useState(comment);

  const renderCommentBodyByMode = (renderMode) => {
    if (renderMode === constants.COMMENT_RENDER_MODE.NEW) { // a new comment is being added
      return (
        <div className='comment-body'>
          <textarea className='form-control w-100' rows='5'
            onChange={(e) => handleSetCommentData({ ...comment, content: e.target.value })}
            value={comment.content} />
        </div>);
    } else if (renderMode === constants.COMMENT_RENDER_MODE.EDIT) { // an existing comment is being edited
      return (
        <div className='comment-body'>
          <textarea className='form-control w-100' rows='5'
            onChange={(e) => setEditedCommentData({...editedComment, content: e.target.value})}
            value={editedComment.content} />
        </div>);
    } else { // an existing comment just needs to be displayed
      return (
        <div className='comment-body'>
          <p className='font-weight-bold'>
            {comment.content}
          </p>
        </div>
      )
    }
  }

  return (
    <div className='col-12'>
      <div className='row'>
        <div className='comment-heading w-100 d-flex justify-content-between'>
          <div className='comment-heading-left'>
            <label className='small mb-0'>
              <FontAwesomeIcon icon={faUserAlt} /> {comment.commenter}
            </label>
            <label className='small mb-0 ml-2'>
              <FontAwesomeIcon icon={faClock} /> {moment(comment.date).format('D/MMM/YY h:MM A')}
            </label>
          </div>
          {commentRenderMode !== constants.COMMENT_RENDER_MODE.NEW ?
            <div className='comment-heading-right'>
              <button className='btn btn-sm btn-sm-square btn-outline-warning comment-action-btn'
                onClick={() => setCommentRenderMode(constants.COMMENT_RENDER_MODE.EDIT)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button className='btn btn-sm btn-sm-square btn-outline-danger comment-action-btn'
                onClick={() => setCommentRenderMode(null)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
            : null
          }
        </div>
        {
          renderCommentBodyByMode(commentRenderMode)
        }
      </div>
      {commentRenderMode ?
        <SaveButtons renderMode={commentRenderMode}
          comment={comment} editedComment={editedComment}
          handleSetCommentRenderMode={setCommentRenderMode}
          handleSetNewCommentData={handleSetCommentData}
          handleSetEditedCommentData={setEditedCommentData}
        /> 
        : null
      }
    </div>
  )
}