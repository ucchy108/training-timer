import { useState, useEffect } from 'react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [time, setTime] = useState<string>('00:00:00:000')
  const [startTime, setStartTime] = useState<number>(0)
  const [passedTime, setPassedTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const DisplayTime = () => {
    const currentTime = new Date(Date.now() - startTime)
    const h = String(currentTime.getHours() - 9).padStart(2, '0')
    const m = String(currentTime.getMinutes()).padStart(2, '0')
    const s = String(currentTime.getSeconds()).padStart(2, '0')
    const ms = String(currentTime.getMilliseconds()).padStart(3, '0')

    setTime(`${h}:${m}:${s}:${ms}`)
  }

  const onClickStart = () => {
    if (passedTime === 0) {
      setStartTime(Date.now())
    } else {
      setStartTime(passedTime)
    }
    setIsRunning(true)
  }

  const onClickStop = () => {
    setIsRunning(false)
    setPassedTime(startTime)
  }

 useEffect(() => {
    if (!isRunning) {
      return () => {}
    }

    const interval: NodeJS.Timer = setInterval(() => DisplayTime(), 10)
    return () => clearInterval(interval)
 }, [isRunning])

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {time}
      </h1>
      <div className="flex">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 mx-4 rounded"
          onClick={() => onClickStart()}
        >
          Start
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 mx-4 rounded"
          onClick={() => onClickStop()}
        >
          Stop
        </button>
      </div>
    </div>
  )
}

export default Home
