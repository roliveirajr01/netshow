import styles from './loading-spinner.module.scss'

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default LoadingSpinner
