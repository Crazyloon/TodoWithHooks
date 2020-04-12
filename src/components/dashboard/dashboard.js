import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from '../tasklist/tasklist';

function Dashboard({ groups }) {
  return (
    <div>
      <h2 className='text-center'>Dashboard</h2>
      <div className='row'>
        {groups.map(group => (
          <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
        ))}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    groups: state.groups
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);