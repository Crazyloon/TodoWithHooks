import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as mutations from "../../store/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { CommentsList } from '../commentlist/commentlist';
import * as constants from '../../store/constants';

export const TestingPage = (props) => {

  const task = {
    id: '109asdijfaasLSKDJFL34',
    name: 'Test Task',
    group: constants.GROUP_ID.TODO,
    owner: 'U1',
    isComplete: false
  }
  const testComments = [
    { id: 'C1',
      task: task.id,
      commenter: 'Test', 
      date: new Date(),
      content: 'This is a test of the emergency brodcast system. This is only a test.'
    },
    { id: 'C2',
      task: task.id,
      commenter: 'Emergency', 
      date: new Date('08/15/1988'), 
      content: 'This is not a test There is a real emergency.'
    }
  ];

  const handleDeleteComment = (id) => {
    const newList = testComments.filter(c => c.id !== id);
    console.log('handleDelete: Delete id: ', id, 
      'Success: ', newList.length < testComments.length, 
      'B: ', testComments.length, 
      'A: ', newList.length);
    return newList;
  }

  const handleEditComment = (comment) => {
    const old = testComments.find(c => c.id == comment.id);
    const i = testComments.findIndex(c => comment.id == c.id);
    testComments[i] = comment;
    console.log('handleEdit: CommentId: ', comment.id,
      'O:', old,
      'N:', testComments[i])
  }

  const handleAddComment = (comment) => {
    const id = (Math.random() * 10000).toFixed(0);
    comment.id = id;
    console.log('B: ', testComments);
    testComments.push(comment);
    console.log('A: ', testComments);
  }

  return (
    <div className="col-12">
      <h2 className="text-center">Component Testing Grounds</h2>
      <div className="m-auto w-75">
      <CommentsList comments={testComments}
                    taskId={task.id} 
                    />
      </div>
    </div>
  )
}

