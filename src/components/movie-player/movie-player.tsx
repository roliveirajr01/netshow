import React, { useEffect, useRef, type RefObject } from 'react';
import Hls from 'hls.js';
import styles from './movie-player.module.scss';
import usePlayerStore from '../../store/usePlayerStore';
import ControlMovie from '../control-movie/control-movie';
import type { MoviePlayerProps } from '../../models/movie-player';

const MoviePlayer: React.FC<MoviePlayerProps> = ({ videoSrc, thumbnail }) => {
  const {
    setVideoRef,
    setIsLoading,
    setDuration,
    setCurrentTime,
  } = usePlayerStore();

  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setVideoRef(localVideoRef as RefObject<HTMLVideoElement>);
    return () => {
      setVideoRef(null);
    };
  }, [setVideoRef]);

  useEffect(() => {
    const videoEl = localVideoRef.current;
    if (!videoEl) return;
    setIsLoading(true);

    let hls: Hls | null = null;

    const onLoadedMetadata = () => {
      if (!isNaN(videoEl.duration)) {
        setDuration(videoEl.duration);
      }
      setIsLoading(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(videoEl.currentTime);
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        maxBufferLength: 90,
        maxMaxBufferLength: 180,
        backBufferLength: 60,
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferSize: 100 * 1000 * 1000,
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(videoEl);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!isNaN(videoEl.duration)) {
          setDuration(videoEl.duration);
        }
        setIsLoading(false);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              break;
          }
        }
      });
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = videoSrc;
    } else {
      videoEl.src = videoSrc;
    }

    videoEl.addEventListener('loadedmetadata', onLoadedMetadata);
    videoEl.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      videoEl.removeEventListener('loadedmetadata', onLoadedMetadata);
      videoEl.removeEventListener('timeupdate', onTimeUpdate);
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoSrc, setDuration, setCurrentTime, setIsLoading]);

  return (
    <div className={styles.videoContainer}>
      <video
        ref={localVideoRef}
        className={styles.videoElement}
        poster={thumbnail}
        playsInline
      />

      <ControlMovie />
    </div>
  );
};

export default MoviePlayer;
