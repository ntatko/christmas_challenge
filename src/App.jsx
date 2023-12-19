import React, { useEffect, useState } from 'react'
import './App.css'
import WordScramble from './Unscramble'

const scrambles = ['utedyeli', 'tielomets', 'ljlnsgbeiel', 'lniets', 'wsfoenlak', 'rrgnedigabe', 'gincarol', 'tcranckuer', 'genggo', 'edrnerie', 'istnockg', 'yenmihc', 'lwaassi', 'rdlagan', 'hligse', 'cacdyenan', 'iasneiptot', 'tfroys', 'onoprhelt', 'tynivtai']
const answers = ['yuletide', 'mistletoe', 'jinglebells', 'tinsel', 'snowflake', 'gingerbread', 'caroling', 'nutcracker', 'eggnog', 'reindeer', 'stocking', 'chimney', 'wassail', 'garland', 'sleigh', 'candycane', 'poinsettia', 'frosty', 'northpole', 'nativity']

function App() {
  const [startedAt] = useState(new Date(localStorage.getItem('startedAt')) || new Date())
  const [finishedAt, setFinishedAt] = useState(localStorage.getItem('finishedAt') ? new Date(localStorage.getItem('finishedAt')) : null)
  const [count, setCount] = useState(0)
  const [wordsComplete, setWordsComplete] = useState(scrambles.map(() => null))

  useEffect(() => {
    localStorage.setItem('startedAt', startedAt)
  }, [startedAt])

  useEffect(() => {
    if (wordsComplete.every(word => word) && !finishedAt) {
      localStorage.setItem('finishedAt', new Date())
      setFinishedAt(new Date())
    }
  }, [wordsComplete, finishedAt])

  const calcTime = () => {
    const diff = finishedAt - startedAt
    const minutes = Math.floor(diff / 60000)
    const seconds = ((diff % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  console.log('wordsComplete', wordsComplete, finishedAt, startedAt)

  return (
    <>
      <h1>Christmas Word Jumble</h1>
      <p>
        Unscramble the letters to form a word. Enter the word in the box below and press enter.
        <br />
        Words can have spaces, but they're ignored.
      </p>
      {scrambles.map((scramble, index) => (
        <div key={scramble} style={{ paddingBottom: 40 }}>
          <WordScramble initialWord={scramble} targetWord={answers[index]} onComplete={() => {
            setWordsComplete(wordsComplete.map((word, i) => i === index ? true : word))
            setCount(count + 1)
          }} show />
        </div>
      ))}
      {finishedAt && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#333', borderRadius: 12 }}>
            <h3 style={{ color: '#fff' }}>You finished in {calcTime()}!</h3>
          </div>
        </div>
      )}
    </>
  )
}

export default App
