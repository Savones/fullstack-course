import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'NEW_ANECDOTE', payload: content })
    setTimeout(() => notificationDispatch({ type: 'EMPTY' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
