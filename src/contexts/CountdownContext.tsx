import React, { createContext, useContext, useEffect, useState } from 'react'

import { ChallengesContext } from './ChallengesContext'

let countdownTimeout: NodeJS.Timeout

interface CountdownContextData {
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountdown: () => void,
  resetCountdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextData)

export const CountdownProvider: React.FC = (props) => {
  const {
    startNewChallenge
  } = useContext(ChallengesContext)

  const defaultTime = 3 //25 * 60

  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(defaultTime)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  const startCountdown = () => {
    setIsActive(true)
  }

  const resetCountdown = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(defaultTime)
    setHasFinished(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else {
      if (isActive && time === 0) {
        setHasFinished(true)
        setIsActive(false)
        startNewChallenge()
      }
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {props.children}
    </CountdownContext.Provider>
  )
}