import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Profile.module.scss'

export const Profile: React.FC = () => {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profile}>
      <img src="https://github.com/brcambui.png" alt="Brendon Cambuí" />
      <div>
        <strong>Brendon Cambuí</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}