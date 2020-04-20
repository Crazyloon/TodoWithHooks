import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../server/defaultState'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';
import * as constants from './constants';

const defaultGroups = [
  {name: 'To Do', id: constants.GROUP_ID.TODO},
  {name: 'Doing', id: constants.GROUP_ID.DOING},
  {name: 'Done', id: constants.GROUP_ID.DONE}
];

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(userSession = defaultState.session || {}, action) {
      let { actionType = action.type, isAuthenticated } = action;
      switch(actionType){
        case mutations.SET_STATE:
          return {
            ...userSession, 
            id: (action.state && action.state.session && action.state.session.id) || '',
            userName: (action.state && action.state.session && action.state.session.userId) || ''
        };
        case mutations.REQUEST_AUTHENTICATE_USER:
          return {...userSession, isAuthenticated: mutations.AUTHENTICATING};  
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return {...userSession, isAuthenticated};
        case mutations.REQUEST_DEAUTHENTICATE_USER:
          return {...userSession, isAuthenticated: mutations.DEAUTHENTICATED};
          default:
            return userSession;
      }
    },
    tasks(tasks = [], action){
      switch(action.type){
        case mutations.SET_STATE:
          return (action.state && action.state.tasks) || [];
        case mutations.CREATE_TASK:
          return [...tasks, {
            id: action.taskId,
            name: action.name,
            group: action.groupId,
            owner: action.ownerId,
            isComplete: action.isComplete
          }];
        case mutations.SET_TASK_COMPLETE:
          return tasks.map(task => {
            return (task.id === action.taskId) ?
              {...task, isComplete: action.isComplete, group: action.isComplete ? 'G3' : action.groupId} :
              task;
          });
        case mutations.SET_TASK_GROUP:
          return tasks.map(task => {
            return (task.id === action.taskId) ?
              {...task, group: action.groupId, isComplete: action.groupId === 'G3' ? true : false} :
              task;
          });
        case mutations.SET_TASK_NAME:
          return tasks.map(task => {
            return (task.id === action.taskId) ?
              {...task, name: action.name} :
              task;
          });

        default: 
          return tasks;
      }
    },
    comments(comments = [], action){
      switch (action.type){
        case mutations.SET_STATE:
          return (action.state && action.state.comments) ? action.state.comments : [];
        case mutations.GET_COMMENTS:
          return action.comments || [];
        case mutations.REQUEST_TASK_COMMENTS:
          return comments;
        case mutations.SAVE_NEW_COMMENT:
          return [...comments, action.comment];
        case mutations.SAVE_EDITED_COMMENT:
          let uneditedComments = comments.filter(c => c.id !== action.comment.id);
          return [...uneditedComments, action.comment];
        default:
          return comments;
      }
    },
    groups(groups = [], action){
      switch (action.type){
        case mutations.SET_STATE:
          return (action.state && action.state.groups && action.state.groups.length > 0) ? action.state.groups : [...defaultGroups];

        default:
          return groups;
      }
    },
    users(users = [], action){
      switch (action.type){

        default:
          return  users;
      }
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas){
  sagaMiddleware.run(sagas[saga]);
}