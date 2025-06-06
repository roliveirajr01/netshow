import styles from './loading-spinner.module.scss'

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default LoadingSpinner
