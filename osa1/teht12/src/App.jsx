import { useState } from 'react'


const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Votes = (props) => {
  return (
    <p>Has {props.points[props.selected]} points</p>
  )
}

const MostVoted = ({ selected }) => <p>{selected}</p>

const Title = ({ text }) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // amount of points for each anecdote
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  // the selected anecdote
  const [selected, setSelected] = useState(0)
  // the anecdote with most votes
  const [mostVotes, setMostVotes] = useState(0)

  const handleVoting = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setMostVotes(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <Title text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <Votes points={points} selected={selected} />
      <Button text='Vote' handleClick={handleVoting} />
      <Button text='Next Anecdote' handleClick={() => setSelected((Math.floor(Math.random() * (8))))} />
      <Title text='Anecdote with most votes' />
      <MostVoted selected={anecdotes[mostVotes]} />
      <Votes points={points} selected={mostVotes} />
    </div>
  )
}

export default App

// {points.indexOf(Math.max(...points))}