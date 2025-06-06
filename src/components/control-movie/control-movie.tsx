import React, { useEffect, useRef } from 'react';
import { PauseIcon, PlayerIcon, FullScreenIcon, SettingsIcon } from '@icons';
import ProgressBarMovie from '@components/progress-bar-movie/progress-bar-movie';
import usePlayerStore from '@store/usePlayerStore';
import TimerProgress from '@components/timer-progress/timer-progress';
import VolumeMovie from '@components/volume-movie/volume-movie';
import styles from './control-movie.module.scss';

const ControlMovie: React.FC = () => {
  const {
    isPlaying,
    showSettings,
    showControls,
    togglePlay,
    setPlaybackRate,
    setShowSettings,
    setShowControls,
    videoRef: storeVideoRef,
    setCurrentTime,
    setIsPlaying,
  } = usePlayerStore();

  useEffect(() => {
    const videoEl = storeVideoRef?.current;
    if (!videoEl) return;

    const handleTimeUpdate = () => {
      setCurrentTime(videoEl.currentTime);
    };

    videoEl.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoEl.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [storeVideoRef, setCurrentTime]);

  useEffect(() => {
    const videoEl = storeVideoRef?.current;
    if (!videoEl) return;

    if (isPlaying) {
      videoEl.play().catch((e) => console.error('Play error:', e));
    } else {
      videoEl.pause();
    }
  }, [isPlaying, storeVideoRef]);

  useEffect(() => {
    const videoEl = storeVideoRef?.current;
    if (!videoEl) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleClick = () => togglePlay();

    videoEl.addEventListener('play', handlePlay);
    videoEl.addEventListener('pause', handlePause);
    videoEl.addEventListener('ended', handleEnded);
    videoEl.addEventListener('click', handleClick);

    return () => {
      videoEl.removeEventListener('play', handlePlay);
      videoEl.removeEventListener('pause', handlePause);
      videoEl.removeEventListener('ended', handleEnded);
      videoEl.removeEventListener('click', handleClick);
    };
  }, [setIsPlaying, togglePlay, storeVideoRef]);

  const handleFullscreenClick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const settingsMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSettings]);

  return (
    <div
      className={`${styles.controls} ${showControls ? styles.visible : ''} ${!isPlaying ? styles.visible : ''}`}
      onMouseMove={() => setShowControls(true)}
    >
      <div className={styles.centerControls}>
        <button onClick={togglePlay} className={styles.playButtonLarge}>
          {isPlaying ? <PauseIcon /> : <PlayerIcon />}
        </button>
      </div>

      <div className={styles.bottomControls}>
        <TimerProgress>
          <ProgressBarMovie />
        </TimerProgress>

        <div className={styles.controlGroup}>
          <div className={styles.leftControls}>
            <button onClick={togglePlay} className={styles.controlButton}>
              {isPlaying ? <PauseIcon /> : <PlayerIcon />}
            </button>

            <VolumeMovie />
          </div>

          <div className={styles.rightControls}>
            <div className={styles.settingsContainer}>
              <button className={styles.controlButton} onClick={() => setShowSettings(!showSettings)}>
                <SettingsIcon />
              </button>
              {showSettings && (
                <div ref={settingsMenuRef} className={styles.settingsMenu}>
                  <div className={styles.settingsHeader}>Velocidade de reprodução</div>
                  <div className={styles.settingsOptions}>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        className={`${styles.settingsOption} ${usePlayerStore.getState().playbackRate === rate ? styles.active : ''
                          }`}
                        onClick={() => {
                          setPlaybackRate(rate);
                          setShowSettings(false);
                        }}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleFullscreenClick} className={styles.controlButton}>
              <FullScreenIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlMovie;