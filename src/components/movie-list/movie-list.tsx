import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
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

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
}

interface PropsMovieList {
  title: string,
  categoryId: string
}

const MovieList = (props: PropsMovieList) => {
  const { data, loading } = GetMovieByCategory(Number(props.categoryId));

  const navigate = useNavigate();

  const handleClick = (item: MediaItem) => {
    navigate(`/detail/${item.id}/${slugify(item.title)}`, {
      state: { video: item }
    });
  };

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
          1280: { slidesPerView: 5.2 }
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
          data.map((item: MediaItem, i) => (
            <SwiperSlide key={i} className={styles.swiperSlide}>
              <div className={styles.card}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClick(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={styles.thumbnail}
                  />
                  <span className={styles.categoryTag}>
                    {CATEGORY_MAPPINGS[Number(item.category)] || "Categoria Desconhecida"}
                  </span>
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