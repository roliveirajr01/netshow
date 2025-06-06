import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Hls from 'hls.js';
import styles from './movie-list.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper-overrides.scss';
import GetMovieByCategory from '../../api/get-video-by-category';
import Skeleton from '../skeleton/skeleton';
import CATEGORY_MAPPINGS from '../../helpers/category-mapping';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slugify } from '../../helpers/slugify';
import type { MediaItem, PropsMovieList } from '../../models/movie-player';


const MovieList = (props: PropsMovieList) => {
  const { data: rawData, loading } = GetMovieByCategory(Number(props.categoryId));
  const data = props.data || (rawData as MediaItem[]) || [];

  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const hlsInstances = useRef<Record<string, Hls>>({});
  const hasInteracted = useRef(false);

  const requestInteraction = () => {
    if (!hasInteracted.current) {
      document.addEventListener('click', handleFirstInteraction, { once: true });
    }
  };
  const handleFirstInteraction = () => {
    hasInteracted.current = true;
    document.removeEventListener('click', handleFirstInteraction);
  };

  const handleClick = (item: MediaItem) => {
    const existing = JSON.parse(localStorage.getItem('continueWatching') || '[]') as MediaItem[];
    const isAlreadySaved = existing.some((video) => video.id === item.id);
    const updatedList = isAlreadySaved
      ? existing
      : [{ ...item, category: '4' }, ...existing].slice(0, 20);
    localStorage.setItem('continueWatching', JSON.stringify(updatedList));
    navigate(`/detail/${item.id}/${slugify(item.title)}`, {
      state: { video: item },
    });
  };

  const handleMouseEnter = (itemId: string) => {
    setHoveredId(itemId);
    requestInteraction();
  };
  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  useEffect(() => {
    data.forEach((item) => {
      const id = item.id;
      const vidEl = videoRefs.current[id];
      if (!vidEl) return;

      if (id === hoveredId) {
        const src = item.hls_path;
        if (src) {
          if (vidEl.canPlayType('application/vnd.apple.mpegurl')) {
            vidEl.src = src;
          } else if (Hls.isSupported()) {
            if (hlsInstances.current[id]) {
              hlsInstances.current[id].destroy();
              delete hlsInstances.current[id];
            }
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(vidEl);
            hlsInstances.current[id] = hls;
          } else {
            console.warn('HLS não suportado neste navegador.');
          }
        }

        vidEl.muted = true;
        vidEl.playsInline = true;
        vidEl.currentTime = 0;
        const playPromise = vidEl.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log('Tentativa de play bloqueada:', err);
          });
        }
      } else {
        vidEl.pause();
        vidEl.currentTime = 0;
        if (hlsInstances.current[id]) {
          hlsInstances.current[id].destroy();
          delete hlsInstances.current[id];
        }
      }
    });
  }, [hoveredId, data]);

  useEffect(() => {
    return () => {
      Object.values(hlsInstances.current).forEach((hls) => hls.destroy());
      hlsInstances.current = {};
    };
  }, []);

  return (
    <section className={styles.movieList}>
      <h2 className={styles.sectionTitle}>{props.title}</h2>

      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 5.2 },
        }}
        className={styles.swiperContainer}
      >
        {loading ? (
          [...Array(5)].map((_, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <Skeleton />
            </SwiperSlide>
          ))
        ) : (
          data.map((item) => (
            <SwiperSlide key={item.id} className={styles.swiperSlide}>
              <div className={styles.card}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClick(item)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className={styles.cardContent}
                >
                  <div className={styles.mediaContainer}>
                    <video
                      ref={(el) => {
                        videoRefs.current[item.id] = el;
                      }}
                      muted
                      loop
                      playsInline
                      className={`
                        ${styles.videoPreview}
                        ${hoveredId === item.id ? styles.videoVisible : ''}
                      `}
                    />

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={styles.thumbnail}
                      style={{
                        opacity: hoveredId === item.id ? 0 : 1,
                      }}
                    />

                    <span className={styles.categoryTag}>
                      {CATEGORY_MAPPINGS[Number(item.category)] ||
                        'Categoria Desconhecida'}
                    </span>
                  </div>

                  <h3 className={styles.title}>{item.title}</h3>
                </motion.div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
};

export default MovieList;
