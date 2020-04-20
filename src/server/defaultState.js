import md5 from 'md5';
import * as constants from '../store/constants';

export const defaultState = {
  session: {
    isAuthenticated: false
  },
  users: [
    {
      id: "U1",
      name: "Dev",
      passwordHash: md5("TUPLES")
    },
    {
      id: "U2",
      name: "R. Dow",
      passwordHash: md5("PROFIT")
    }
  ],
  groups: [
    {
      name: "To Do",
      id: constants.GROUP_ID.TODO,
      owner:"U1"
    },
    {
      name: "Doing",
      id: constants.GROUP_ID.DOING,
      owner:"U1"
    },
    {
      name: "Done",
      id: constants.GROUP_ID.DONE,
      owner:"U1"
    }
  ], 
  tasks: [
    {
      name:"Refactor tests",
      id:"T1",
      group:constants.GROUP_ID.TODO,
      owner:"U1",
      isComplete:false
    },
    {
      name:"Meet with CTO",
      id:"T2",
      group:constants.GROUP_ID.DONE,
      owner:"U1",
      isComplete:true
    },
    {
      name:"Compile ES6",
      id:"T3",
      group:constants.GROUP_ID.DOING,
      owner:"U2",
      isComplete:false
    },
    {
      name:"Update component snapshots",
      id:"T4",
      group:constants.GROUP_ID.DOING,
      owner:"U2",
      isComplete:false
    },
    {
      name:"Create our first component",
      id:"T5",
      group:constants.GROUP_ID.DONE,
      owner:"U2",
      isComplete:true
    }
  ],
  comments: [
    {
      owner:"U1",
      id:"C1",
      task:"T1",
      content:"Great Work!"
    },
    {
      owner:"U1",
      id:"C2",
      task:"T1",
      content:"This is the best comment of all time. Please check out what we can do to improve the style of this section!"
    }
  ]
}