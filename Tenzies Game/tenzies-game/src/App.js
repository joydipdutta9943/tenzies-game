import { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allState = dice.every(die => die.isheld)
    const firstValue = dice[0].value
    const allValue = dice.every(die => die.value === firstValue)
    if (allState && allValue) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        isheld: false,
        id: nanoid()
      })
    }
    return arr
  }

  function holdDie(id) {
    setDice(oldDiec => oldDiec.map(Die => {
      return id === Die.id ? { ...Die, isheld: !Die.isheld } : Die
    }))
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isheld ? die : {
          value: Math.ceil(Math.random() * 6),
          isheld: false,
          id: nanoid()
        }
      }))
    }
  }

  const diceElement = dice.map(die =>
    <Die key={die.id}
      value={die.value}
      isheld={die.isheld}
      holdDie={() => holdDie(die.id)}
    />)

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App;