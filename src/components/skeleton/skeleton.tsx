import React from 'react'
import styles from './skeleton.module.scss'
const Skeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonThumbnail} />
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonTitle} />
      </div>
    </div>
  )
}

export default Skeleton