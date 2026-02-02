import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const anecdotes = state.map(a => a.id !== id ? a : { ...anecdote, votes: anecdote.votes + 1 })
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return [...action.payload].sort((a, b) => b.votes - a.votes)
    }
  }
})

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAncedotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVote(id)
    dispatch(voteAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
