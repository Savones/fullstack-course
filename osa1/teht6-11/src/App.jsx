import { useState } from 'react'


const Titel = (props) => <h1>{props.text}</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = ({ goodAmount, neutralAmount, badAmount }) => {
  const sum = goodAmount + neutralAmount + badAmount

  if (sum === 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={goodAmount} />
        <StatisticLine text="Neutral" value={neutralAmount} />
        <StatisticLine text="Bad" value={badAmount} />
        <StatisticLine text="All" value={sum} />
        <StatisticLine text="Avarage" value={(goodAmount - badAmount) / sum} />
        <StatisticLine text="Positive" value={goodAmount / (0.01 * sum) + '%'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Titel text='Give feedback' />
      <Button text='Good' handleClick={() => setGood(good + 1)} />
      <Button text='Neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='Bad' handleClick={() => setBad(bad + 1)} />
      <Titel text='Statistics' />
      <Statistics goodAmount={good} neutralAmount={neutral} badAmount={bad} />
    </>
  )
}

export default App