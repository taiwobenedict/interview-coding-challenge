import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './actions/userActions';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

export default store;