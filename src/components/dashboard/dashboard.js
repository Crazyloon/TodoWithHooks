import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from '../tasklist/tasklist';

function Dashboard({ groups }) {
  return (
    <div className='mt-5'>
      <h2>Dashboard</h2>
      {groups.map(group => (
        <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    groups: state.groups
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);