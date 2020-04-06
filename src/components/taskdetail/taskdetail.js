import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../../store/mutations';

function TaskDetail({
    id,
    comments,
    task,
    isComplete,
    groups,
    setTaskCompletion,
    setTaskGroup,
    setTaskName 
  }) {
  return (
    <div className="col-12">
      <div className="form m-auto w-50">
        <div className='form-group'>
          <input onChange={setTaskName} type='text' className='form-control' value={task.name} />
        </div>
        <div className='form-group'>
          <select onChange={setTaskGroup} value={task.group} className='form-control'>
            {groups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <button onClick={() => setTaskCompletion(id, !isComplete)} className='btn btn-primary'>{isComplete ? 'Reopen' : 'Complete'}</button>
        </div>
      </div>
      <div className='mt-5'>
        <Link to="/dashboard">
          <button className='btn btn-secondary'>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task => task.id === id);
  let groups = state.groups;

  return { id, task, groups, isComplete: task.isComplete }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete){
      dispatch(mutations.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e){
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName(e){
      dispatch(mutations.setTaskName(id, e.target.value));
    }
  }
}

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetail);