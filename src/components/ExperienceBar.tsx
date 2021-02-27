import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/ExperienceBar.module.scss'

export const ExperienceBar: React.FC = () => {
  const {
    currentExperience,
    experienceToNextLevel
  } = useContext(ChallengesContext)

  const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel)

  return (
    <header className={styles.experienceBar}>
      <span>
        0 xp
      </span>
      <div className={styles.progress}>
        <div
          className={styles.progressInner}
          style={{ width: `${percentToNextLevel}%` }}
        />
        {currentExperience > 0 && (
          <span
            className={styles.currentExperience}
            style={{ left: `${percentToNextLevel}%` }}
          >
            {currentExperience} xp
          </span>
        )}
      </div>
      <span>
        {experienceToNextLevel} xp
      </span>
    </header>
  )
}