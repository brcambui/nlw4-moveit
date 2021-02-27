import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  activeChallenge: Challenge,
  experienceToNextLevel: number,
  levelUp: () => void,
  startNewChallenge: () => void
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
  level?: number,
  currentExperience?: number,
  challengesCompleted?: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export const ChallengesProvider: React.FC<ChallengesProviderProps> = (props) => {
  const [level, setLevel] = useState(props.level || 0)
  const [currentExperience, setCurrentExperience] = useState(props.currentExperience || 0)
  const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted || 0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => { Notification.requestPermission() }, [])

  useEffect(() => {
    Cookies.set(`level`, level.toString())
    Cookies.set(`currentExperience`, currentExperience.toString())
    Cookies.set(`challengesCompleted`, challengesCompleted.toString())
  }, [level, currentExperience, challengesCompleted])

  const levelUp = () => {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex] as Challenge
    setActiveChallenge(challenge)

    new Audio('notification.mp3').play()

    if (Notification.permission === `granted`) {
      const notification = new Notification(`Novo desafio disponível 🎉`, {
        body: `Valendo ${challenge.amount} xp!`,
        icon: `favicon.png`,
        silent: true
      })
      notification.onclick = () => window.focus()
    }
  }

  const resetChallenge = () => {
    setActiveChallenge(null)
  }

  const completeChallenge = () => {
    if (!activeChallenge) return

    const { amount } = activeChallenge

    let totalExperience = currentExperience + amount

    if (totalExperience >= experienceToNextLevel) {
      totalExperience = totalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(totalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false)
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      experienceToNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal
    }}>
      {props.children}

      {isLevelUpModalOpen && (
        <LevelUpModal />
      )}
    </ChallengesContext.Provider>
  )
}