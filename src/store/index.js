import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../server/defaultState'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(userSession = defaultState.session || {}, action) {
      let { actionType = action.type, isAuthenticated } = action;
      switch(actionType){
        case mutations.SET_STATE:
          return {...userSession, id: action.state ? action.state.session.id : {}};
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
          return action.state ? action.state.tasks : [];
        case mutations.CREATE_TASK:
          return [...tasks, {
            id: action.taskId,
            name: "New Task",
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
    comments(comments = []){
      return comments;
    },
    groups(groups = [], action){
      switch (action.type){
        case mutations.SET_STATE:
          return action.state ? action.state.groups : [];
          
        default:
          return groups;
      }
    },
    users(users = []){
      return  users;
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas){
  sagaMiddleware.run(sagas[saga]);
}