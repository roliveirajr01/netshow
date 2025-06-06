
export interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  hls_path: string;
}

export interface PropsMovieList {
  title: string;
  categoryId: string;
  data?: MediaItem[];
}

export interface MoviePlayerProps {
  videoSrc: string;
  thumbnail: string;
}

export interface TimerProgressProps {
  children: React.ReactNode;
}

export interface VideoDetail {
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
