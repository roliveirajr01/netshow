import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import MoviePlayer from '../components/movie-player/movie-player';
import { FaPlay, FaPlus, FaShare } from 'react-icons/fa';
import styles from './detail.module.scss';

interface VideoDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  hls_path: string;
  created_at: string;
  views: number;
  likes: number;
  category: number;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (location.state?.video) {
      setVideo(location.state.video);
      setLoading(false);
    } else {
      const fetchVideo = async () => {
        try {
          const response = await api.get(`/videos/${id}`);
          setVideo(response.data);
        } catch (error) {
          console.error('Failed to fetch video:', error);
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
      fetchVideo();
    }
  }, [id, location.state, navigate]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className={styles.notFoundContainer}>
        <h1>Vídeo não encontrado</h1>
        <button onClick={() => navigate('/')}>
          Voltar para início
        </button>
      </div>
    );
  }

  const getEpisodeNumber = (title: string) => {
    const match = title.match(/Episódio\s+(\d+)|Ep\.\s*(\d+)/i);
    return match ? match[1] || match[2] || "N/A" : "N/A";
  };

  return (
    <div className={styles.container}>
      <div className={styles.playerWrapper}>
        <MoviePlayer
          videoSrc={video.hls_path}
          thumbnail={video.thumbnail}
          title={video.title}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.contentWrapper}
      >
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          ← Voltar
        </button>

        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <div className={styles.episodeInfo}>
              <span className={styles.episodeBadge}>
                Ép. {getEpisodeNumber(video.title)}
              </span>
              <span className={styles.date}>
                {new Date(video.created_at).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <h1 className={styles.title}>{video.title}</h1>

            <div className={styles.actions}>
              <button className={`${styles.button} ${styles.playButton}`}>
                <FaPlay className={styles.icon} />
                <span>Assistir agora</span>
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                <FaPlus className={styles.icon} />
                <span>Minha lista</span>
              </button>

              <button className={`${styles.button} ${styles.secondaryButton}`}>
                <FaShare className={styles.icon} />
                <span>Compartilhar</span>
              </button>
            </div>

            <div className={styles.stats}>
              <span>{video.views} visualizações</span>
              <span>{video.likes} curtidas</span>
            </div>

            <div className={styles.descriptionBox}>
              <h2 className={styles.descriptionTitle}>Descrição</h2>
              <p className={styles.descriptionText}>
                {video.description}
              </p>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.infoBox}>
              <h3 className={styles.infoBoxTitle}>Informações</h3>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <span className={styles.infoLabel}>Categoria:</span>
                  <span>Over The Cast</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.infoLabel}>Duração:</span>
                  <span>45 min</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.infoLabel}>Qualidade:</span>
                  <span>Full HD</span>
                </li>
              </ul>
            </div>

            <div className={styles.infoBox}>
              <h3 className={styles.infoBoxTitle}>Talvez você goste</h3>
              <div className={styles.relatedContent}>
                {[1, 2, 3].map(item => (
                  <div key={item} className={styles.relatedItem}>
                    <div className={styles.relatedImage}></div>
                    <div className={styles.relatedInfo}>
                      <div className={styles.relatedTitle}>Conteúdo relacionado</div>
                      <div className={styles.relatedCategory}>Categoria</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Detail;