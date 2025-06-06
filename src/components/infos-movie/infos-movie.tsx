import React from 'react'
import styles from './infos-movie.module.scss'
import { SaveIcon, LikeIcon, ShareIcon, DislikeIcon } from '@icons'
import { InfosMovies } from '@models/infos-movie'
import { CATEGORY_MAPPINGS } from '@helpers'
import { formatDateTime } from '@helpers/format-date-time'

const InfosMovie: React.FC<InfosMovies> = ({ title, likes, description, date, id, category }) => {
  console.log(likes, description, id)
  return (
    <div className={styles.infosContainer}>
      <div className={styles.containerLeft}>
        <h1>{title}</h1>
        <div className={styles.subtitle}>
          <p>{CATEGORY_MAPPINGS[Number(category)]}</p>
          <p>{formatDateTime(date)}</p>
          <p className={styles.date}>
            <SaveIcon />
            <b>Adicionar à minha lista</b>
          </p>
        </div>
      </div>

      <div className={styles.containerRight}>
        <p><LikeIcon /> Gostei</p>
        <p><DislikeIcon /> Não é pra mim</p>
        <p><ShareIcon /> Compartilhar</p>
      </div>
    </div>
  )
}

export default InfosMovie