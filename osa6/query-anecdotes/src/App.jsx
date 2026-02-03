import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      console.log("success")
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: 'VOTE', payload: anecdote.content })
    setTimeout(() => notificationDispatch({ type: 'EMPTY' }), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server. Error: {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification type="NEW_ANECDOTE" />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
