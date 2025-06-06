import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';
import { PlayerThumbIcon } from '@icons';
import CATEGORY_MAPPINGS from '@helpers/category-mapping';
import styles from './card-items.module.scss';
import { MovieCardProps } from '@models/card-item';

const CardItems: React.FC<MovieCardProps> = ({
  item,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const vidEl = videoRef.current;
    if (!vidEl) return;

    if (isHovered) {
      const src = item.hls_path;
      if (src) {
        if (vidEl.canPlayType('application/vnd.apple.mpegurl')) {
          vidEl.src = src;
        } else if (Hls.isSupported()) {
          hlsRef.current?.destroy();
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(vidEl);
          hlsRef.current = hls;
        } else {
          console.warn('HLS não suportado neste navegador.');
        }
      }
      vidEl.muted = true;
      vidEl.playsInline = true;
      vidEl.currentTime = 0;
      vidEl.play().catch(() => { });
    } else {
      vidEl.pause();
      vidEl.currentTime = 0;
      hlsRef.current?.destroy();
      hlsRef.current = undefined;
    }

    return () => {
      hlsRef.current?.destroy();
    };
  }, [isHovered, item.hls_path]);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(item)}
      onMouseEnter={() => onMouseEnter(item.id)}
      onMouseLeave={onMouseLeave}
      className={styles.card}
    >
      <div className={styles.playerThumb}>
        <PlayerThumbIcon />
      </div>

      <div className={styles.mediaContainer}>
        <video
          ref={videoRef}
          loop
          playsInline
          className={`${styles.videoPreview} ${isHovered ? styles.videoVisible : ''}`}
        />

        <img
          src={item.thumbnail}
          alt={item.title}
          className={styles.thumbnail}
          style={{ opacity: isHovered ? 0 : 1 }}
        />

        <span className={styles.categoryTag}>
          {CATEGORY_MAPPINGS[Number(item.category)] || 'Categoria Desconhecida'}
        </span>
      </div>

      <h3 className={styles.title}>{item.title}</h3>
    </motion.div>
  );
};

export default CardItems;
