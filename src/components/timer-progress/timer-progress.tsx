import React from 'react';
import formatTime from '../../helpers/format-time';
import usePlayerStore from '../../store/usePlayerStore';
import styles from './timer-progress.module.scss';
import type { TimerProgressProps } from '../../models/movie-player';

const TimerProgress: React.FC<TimerProgressProps> = ({ children }) => {
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const validDuration = typeof duration === 'number' && !Number.isNaN(duration) ? duration : 0;
  const remaining = validDuration > currentTime ? validDuration - currentTime : 0;

  return (
    <div className={styles.timerProgress}>
      <div className={styles.timeDisplay}>
        <span>{formatTime(currentTime)}</span>
      </div>

      {children}

      <div className={styles.timeDisplay}>
        <span>{formatTime(remaining)}</span>
      </div>
    </div>
  );
};


export default TimerProgress;