import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    }
  }
})

export const { notify } = notificationSlice.actions

export const showNotification = (content) => {
  return async dispatch => {
    dispatch(notify(content))
    setTimeout(() => { dispatch(notify('')) }, 5000)
  }
}

export default notificationSlice.reducer
