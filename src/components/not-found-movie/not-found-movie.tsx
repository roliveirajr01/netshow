import type { NotFoundMovieProps } from '@models/not-found-movie';
import styles from './not-found-movie.module.scss';

const NotFoundMovie = ({ children }: NotFoundMovieProps) => {
  return (
    <div className={styles.notFoundContainer}>
      {children}
    </div>
  );
};

export default NotFoundMovie;
