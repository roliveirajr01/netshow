import { MediaItem } from "./movie-player";

export interface MovieCardProps {
  item: MediaItem;
  isHovered: boolean;
  onClick: (item: MediaItem) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}