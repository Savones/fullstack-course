import { useSelector, useDispatch } from 'react-redux'


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

  const vote = id => {
    dispatch({ type: 'VOTE', anecdoteId: { id } })
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList