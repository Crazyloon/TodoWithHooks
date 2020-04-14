import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../../store/mutations'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function TaskList({ tasks, name, id, createNewTask }) {
  return (
    <div className='col-md-4 task-list'>
      <div className='card card-light p-2'>
        <h4 className='text-center'>{name}</h4>
        <div className='task-list-items'>
          {tasks.map(task => (
            <div className='task-item text-center p-1' key={task.id}>
              <Link to={`/task/${task.id}`}>
                <div>
                  {task.name}
                </div>
              </Link>
            </div>
          ))
          }
        </div>
        <button className='btn btn-secondary mt-2' onClick={() => createNewTask(id)}><FontAwesomeIcon icon={faPlus} /> Add New</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let groupId = ownProps.id;
  return {
    name: ownProps.name,
    id: groupId,
    tasks: state.tasks.filter(t => t.group === groupId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log("Creating new task...", id);
      dispatch(requestTaskCreation(id));
    }
  }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);