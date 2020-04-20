import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from '../tasklist/tasklist';

function Dashboard({ groups, loggedInUser }) {
  return (
    <div>
      <h2 className='text-center'>Dashboard</h2>
      <div className='row'>
        {groups.map(group => (
          <ConnectedTaskList key={group.id} id={group.id} name={group.name} loggedInUser={loggedInUser} />
        ))}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    groups: state.groups,
    loggedInUser: state.session && state.session.id
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);