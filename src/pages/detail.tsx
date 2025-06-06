import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import MoviePlayer from '../components/movie-player/movie-player';
import NotFoundMovie from '../components/not-found-movie/not-found-movie';
import LoadingSpinner from '../components/loading-spinner/loading-spinner';
import type { VideoDetail } from '../models/movie-player';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(true);


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

  // const handleLike = async () => {
  //   if (!video || isLiking) return;

  //   try {
  //     setIsLiking(true);
  //     const newLikes = video.likes + 1;
  //     setVideo({ ...video, likes: newLikes });
  //     await api.patch(`/videos/${video.id}`, {
  //       likes: newLikes
  //     });

  //   } catch (error) {
  //     console.error('Erro ao curtir:', error);
  //     if (video) setVideo({ ...video });
  //   } finally {
  //     setIsLiking(false);
  //   }
  // };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (!video) {
    return (
      <NotFoundMovie>
        <h1>Vídeo não encontrado</h1>
        <button onClick={() => navigate('/')}>
          Voltar para início
        </button>
      </NotFoundMovie>
    );
  }

  return (
    <MoviePlayer
      videoSrc={video.hls_path}
      thumbnail={video.thumbnail}
    />
  );
};

export default Detail;