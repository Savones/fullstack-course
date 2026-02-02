import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return [...state.anecdotes]
      .filter((anecdote) => anecdote.content
        .toLowerCase()
        .includes(state.filter
          .toLowerCase()
        ))
  })

  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(showNotification(`You voted: ${content}`, 1500))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList