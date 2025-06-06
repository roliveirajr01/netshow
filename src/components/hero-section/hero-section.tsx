import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './hero-section.module.scss';
import { PlayIcon } from '@icons';

const HeroSection = () => {
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  function triggerBulletAnimation() {
    if (!swiperContainerRef.current) return;
    swiperContainerRef.current
      .querySelectorAll<HTMLElement>('.swiper-pagination-bullet')
      .forEach((el) => {
        el.classList.remove('animate');
      });

    const bulletAtivo = swiperContainerRef.current.querySelector<HTMLElement>(
      '.swiper-pagination-bullet-active'
    );
    if (bulletAtivo) {
      bulletAtivo.classList.remove('animate');
      bulletAtivo.offsetWidth;
      bulletAtivo.classList.add('animate');
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerBulletAnimation();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const slides = [
    {
      label: 'Over the Cast',
      title: 'TikTok como inovação na era digital, com Rafael Kiso',
      description: 'Os principais desafios na priorização no desenvolvimento de novos produtos.',
    },
    {
      label: 'Over the Cast',
      title: 'Outro episódio interessante para acompanhar',
      description: 'Conheça os bastidores da criação de produtos inovadores.',
    },
  ];

  return (
    <section className={styles.heroSection}>
      <div ref={swiperContainerRef}>
        <Swiper
          modules={[Pagination, Autoplay]}
          effect={'fade'}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          onSlideChange={() => {
            triggerBulletAnimation();
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slideContent}>
                <div className={styles.slideContainer}>
                  <span className={styles.label}>{slide.label}</span>
                  <h2 className={styles.title}>{slide.title}</h2>
                  <p className={styles.description}>{slide.description}</p>
                  <button className={styles.button}>
                    <PlayIcon />
                    Reproduzir agora
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSection