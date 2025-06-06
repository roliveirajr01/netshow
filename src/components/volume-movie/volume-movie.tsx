import React from 'react'
import styles from './volume-movie.module.scss'
import VolumeIcon from '../../assets/icons/volume-icon';
import { RiVolumeMuteLine } from 'react-icons/ri';
import usePlayerStore from '../../store/usePlayerStore';

const VolumeMovie = () => {
  const {
    volume,
    isMuted,
    setVolume,
    toggleMute,
  } = usePlayerStore();

  const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const updateVolume = (clientX: number) => {
      if (!volumeContainerRef.current) return;
      const rect = volumeContainerRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const width = rect.width;
      const newVolume = Math.min(1, Math.max(0, clickX / width));
      setVolume(newVolume);
    };

    updateVolume(e.clientX);

    const onMouseMove = (ev: MouseEvent) => updateVolume(ev.clientX);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const volumeContainerRef = React.useRef<HTMLDivElement>(null);
  const handleMuteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleMute();
  };
  return (
    <div>
      <div
        ref={volumeContainerRef}
        className={styles.volumeContainer}
        onMouseDown={handleVolumeMouseDown}
      >
        <button className={styles.volumeButton} onClick={handleMuteToggle}>
          {isMuted || volume === 0 ? <RiVolumeMuteLine /> : <VolumeIcon />}
        </button>
        <div className={styles.volumeSlider}>
          <div className={styles.volumeLevel} style={{ width: `${volume * 100}%` }} />
          <div className={styles.volumeThumb} style={{ left: `${volume * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

export default VolumeMovie;