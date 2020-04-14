import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faClock, faEdit, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import * as moment from 'moment';

export const Comment = ({ comment }) => {
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
          <div className='comment-heading-right'>
            <button className='btn btn-sm btn-sm-square btn-outline-warning comment-action-btn'>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button className='btn btn-sm btn-sm-square btn-outline-danger comment-action-btn'>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='comment-body'>
          <p className='font-weight-bold'>
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  )
}