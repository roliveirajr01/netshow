import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import GetMovieByCategory from '@api/get-video-by-category';
import Skeleton from '@components/skeleton/skeleton';
import { useNavigate } from 'react-router-dom';
import { slugify } from '@helpers';
import type { MediaItem, PropsMovieList } from '@models/movie-player';
import styles from './movie-list.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper-overrides.scss';
import { CardItems } from '@components';

const MovieList: React.FC<PropsMovieList> = (props) => {
  const { data: rawData, loading } = GetMovieByCategory(Number(props.categoryId));
  const data = props.data || (rawData as MediaItem[]) || [];
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    requestInteraction();
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <section className={styles.movieList}>
      <h2 className={styles.sectionTitle}>{props.title}</h2>

      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={'auto'}
        breakpoints={{
          0: { slidesPerView: 1.2 },
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
              <CardItems
                item={item}
                isHovered={hoveredId === item.id}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
};

export default MovieList;
