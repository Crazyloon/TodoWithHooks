import { take, put } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import * as mutations from './mutations';
import { history } from './history';

const url = "http://localhost:8000";

export function* taskCreationSaga(){
  while (true){
    const { groupId, name, ownerId } = yield take(mutations.REQUEST_TASK_CREATION);
    const isComplete = (groupId === 'G3') ? true : false;
    const taskId = uuid();
    const res  = yield axios.post(url + '/task/new', {
      task: {
        id: taskId,
        owner: ownerId,
        group: groupId,
        isComplete: isComplete,
        name: name
      }
    });
    if (res && res.status === 200) {
      yield put(mutations.createTask(taskId, groupId, ownerId, isComplete, name));
    } else {
      // TODO put an error message
    }
  }
}

export function* taskModifcationSaga(){
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE,
    ]);
    axios.post(url + '/task/update', {
      task:{
        id: task.taskId,
        group: task.groupId,
        name: task.name,
        isComplete: task.isComplete
      }
    });
  }
}

export function* userAuthenticationSaga(){
  while (true) {
    const {username, password} = yield take([
      mutations.REQUEST_AUTHENTICATE_USER
    ]);

    try {
      const { data } = yield axios.post(url + '/authenticate', {username,password})
      if(!data){
        throw new Error();
      }
      console.log('AUTHENTICATED', data);

      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

      history.push('/dashboard');
    } catch (e) {
      console.log('Authentication failed or was revoked.');
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
    }

  }
}

export function* userDeauthenticationSaga(){
  while(true){
    yield take([
      mutations.REQUEST_DEAUTHENTICATE_USER
    ]);
    yield put(mutations.setState(null));
    yield put(mutations.requestDeauthenticateUser(mutations.DEAUTHENTICATED));
    history.push('/');

  }
}

export function* commentsRetrievalSaga(){
  while (true){
    const { taskId } = yield take(mutations.REQUEST_TASK_COMMENTS);

    try {
      const { data } = yield axios.get(url + `/comments/${taskId}`);
      yield put(mutations.setComments(data.comments));
    } catch (e) {
      console.log('[comments]', e)
      // yield put()
    }
  }
}

export function* commentCreationSaga() {
  while (true){
    const { comment } = yield take(mutations.REQUEST_COMMENT_CREATION);

    try {
      const res = yield axios.post(url + '/comments/new', { comment });
      if (res.status === 200){
        yield put(mutations.saveNewComment(comment))
      } else {
        // TODO handle failed response
      }
    } catch (e) {
      // TODO: Handle errors
      console.log('[Comment Creation] ERROR:', e);
    }
  }
}

export function* commentUpdateSaga() {
  while (true) {
    const { comment } = yield take(mutations.REQUEST_COMMENT_UPDATE);

    try {
      const res = yield axios.put(url + `/comments/${comment.id}`, { comment });
      if (res.status === 200) {
        yield put(mutations.saveEditedComment(comment));
      } else {
        // TODO handle failed response
      }
    } catch (e) {
      console.log('[Comment Update] Error', e);
    }
  }
}
