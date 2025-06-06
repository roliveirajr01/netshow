import React, { useRef, useEffect, useState } from 'react';
import styles from './progress-bar-movie.module.scss';
import usePlayerStore from '../../store/usePlayerStore';

const ProgressBarMovie: React.FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = usePlayerStore((s) => s.videoRef);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const updateTime = (clientX: number) => {
    const bar = progressBarRef.current;
    if (!bar || !videoRef?.current || duration <= 0) return;

    const rect = bar.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = clickX / rect.width;
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);

    console.log("Updating video time to:", newTime);

  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    updateTime(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateTime(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={progressBarRef}
      className={styles.progressContainer}
      onMouseDown={handleMouseDown}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progressPercent}%` }}
        />
        <div
          ref={thumbRef}
          className={styles.progressThumb}
          style={{ left: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBarMovie;