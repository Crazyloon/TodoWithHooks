import * as constants from './constants';

export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;

export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const REQUEST_DEAUTHENTICATE_USER = `REQUEST_DEAUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const DEAUTHENTICATED = `DEAUTHENTICATED`;
export const SET_STATE = `SET_STATE`;

export const REQUEST_TASK_COMMENTS = `REQUEST_TASK_COMMENTS`;
export const GET_COMMENTS = `GET_COMMENTS`;
export const REQUEST_COMMENT_CREATION = `REQUEST_COMMENT_CREATION`;
export const SAVE_NEW_COMMENT = `SAVE_NEW_COMMENT`;
export const REQUEST_COMMENT_UPDATE = `REQUEST_COMMENT_UPDATE`;
export const SAVE_EDITED_COMMENT = `SAVE_EDITED_COMMENT`;

export const requestTaskCreation = (groupId, ownerId, name = "New Task") => ({
  type: REQUEST_TASK_CREATION,
  groupId,
  ownerId,
  name
});

export const createTask = (taskId, groupId, ownerId, isComplete, name) => ({
  type: CREATE_TASK,
  taskId,
  groupId,
  ownerId,
  isComplete,
  name
});

export const setTaskCompletion = (taskId, isComplete) => ({
  type: SET_TASK_COMPLETE,
  taskId,
  isComplete,
  groupId: (isComplete) ? constants.GROUP_ID.DONE : constants.GROUP_ID.TODO
});

export const setTaskName = (taskId, name) => ({
  type: SET_TASK_NAME,
  taskId,
  name
});

export const setTaskGroup = (taskId, groupId) => ({
  type: SET_TASK_GROUP,
  taskId,
  groupId
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password
});

export const requestDeauthenticateUser = (status = DEAUTHENTICATED, session = null) => ({
  type: REQUEST_DEAUTHENTICATE_USER,
  session,
  isAuthenticated: status
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  isAuthenticated: status
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state
});

export const setComments = (comments = {}) => ({
  type: GET_COMMENTS,
  comments
});

export const requestTaskComments = (taskId) => ({
  type: REQUEST_TASK_COMMENTS,
  taskId
});

export const requestCommentCreation = (comment) => ({
  type: REQUEST_COMMENT_CREATION,
  comment
});

export const saveNewComment = (comment) => ({
  type: SAVE_NEW_COMMENT,
  comment
});

export const requestCommentUpdate = (comment) => ({
  type: REQUEST_COMMENT_UPDATE,
  comment
});

export const saveEditedComment = (comment) => ({
  type: SAVE_EDITED_COMMENT,
  comment
});