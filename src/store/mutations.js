export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
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

export const requestTaskCreation = (groupId, name = "New Task") => ({
  type: REQUEST_TASK_CREATION,
  groupId,
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
  groupId: (isComplete) ? "G3" : "G1"
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
})