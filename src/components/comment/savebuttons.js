import React from 'react';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSlash, faSave } from '@fortawesome/free-solid-svg-icons';
import * as mutations from '../../store/mutations';
import * as constants from '../../store/constants';

export const SaveButtons = ({
  renderMode,
  comment,
  editedComment,
  handleSetCommentRenderMode,
  handleSetNewCommentData,
  handleSetEditedCommentData
}) => {
  const dispatch = useDispatch();

  return (
    <div className='row'>
      <div className='w-100 text-right mt-1'>
        <button className='btn btn-danger btn-sm'
          onClick={
            () => { //RESET COMMENT DATA
              handleSetCommentRenderMode(null);
              if (renderMode === constants.COMMENT_RENDER_MODE.NEW) {
                handleSetNewCommentData(null);
              } else {
                handleSetEditedCommentData(comment);
              }
            }
          }
        >
          <FontAwesomeIcon icon={faCommentSlash} /> Cancel
        </button>
        <button className='btn btn-primary btn-sm ml-2'
          onClick={() => { // SAVE COMMENT DATA
            handleSetCommentRenderMode(null);
            if (renderMode === constants.COMMENT_RENDER_MODE.NEW) {
              dispatch(mutations.requestCommentCreation(comment));
              handleSetNewCommentData(null);
            } else {
              dispatch(mutations.requestCommentUpdate(editedComment));
            }
          }
          }
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
      </div>
    </div>
  )

}