
import axios from 'axios';


export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersRequest());

    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchUsersFailure(errorMessage));
      });
  };
};

// Create initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
};



// User Reducers

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

