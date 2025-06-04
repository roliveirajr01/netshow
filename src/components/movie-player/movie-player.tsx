import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import styles from './movie-player.module.scss';

interface MoviePlayerProps {
  videoSrc: string;
  thumbnail: string;
  title: string;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({
  videoSrc,
  thumbnail,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    let hls: Hls | null = null;

    if (video) {
      const initPlayer = () => {
        if (Hls.isSupported()) {
          hls = new Hls({
            autoStartLoad: true,
            maxBufferLength: 30,
            enableWorker: true,
          });

          hls.loadSource(videoSrc);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setIsLoading(false);
          });

          hls.on(Hls.Events.ERROR, (_, data) => {
            console.error('HLS error:', data);
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
          video.addEventListener('loadedmetadata', () => {
            setIsLoading(false);
          });
        }
      };

      initPlayer();

      video.addEventListener('play', () => setIsPlaying(true));
      video.addEventListener('pause', () => setIsPlaying(false));
      video.addEventListener('waiting', () => setIsLoading(true));
      video.addEventListener('playing', () => setIsLoading(false));

      const container = video.parentElement;
      if (container) {
        container.addEventListener('mousemove', () => {
          setShowControls(true);
          setTimeout(() => setShowControls(false), 3000);
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        className={styles.videoElement}
        onClick={togglePlay}
        poster={thumbnail}
      />

      {!isPlaying && (
        <div
          className={styles.overlay}
          onClick={togglePlay}
        >
          <div className={styles.playButtonLarge}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      <div
        className={`${styles.controls} ${showControls || !isPlaying ? styles.visible : ''}`}
      >
        <div className={styles.controlsInner}>
          <button
            onClick={togglePlay}
            className={styles.controlButton}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '30%' }}></div>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <button className={styles.controlButton}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
              </svg>
            </button>
            <button className={styles.controlButton}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06zM18.584 5.106a.75.75 0 00-1.06 0c-.97.97-1.46 2.291-1.46 3.621s.49 2.65 1.46 3.62a.75.75 0 001.06-1.06c-.85-.85-1.46-2.01-1.46-3.56 0-1.552.61-2.71 1.46-3.56a.75.75 0 000-1.06z" />
                <path d="M15.932 7.757a.75.75 0 00-1.061 0c-.769.768-1.12 1.81-1.12 2.871 0 1.06.351 2.103 1.12 2.87a.75.75 0 001.06-1.06c-.514-.514-.88-1.218-.88-1.81 0-.593.366-1.297.88-1.81a.75.75 0 000-1.061z" />
              </svg>
            </button>
            <button className={styles.controlButton}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zm9.75 9.75a.75.75 0 00.75-.75v-6a.75.75 0 00-1.5 0v6a.75.75 0 00.75.75zm-6-3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  );
};

export default MoviePlayer;