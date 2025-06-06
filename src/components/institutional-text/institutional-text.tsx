import React from 'react'
import styles from './institutional-text.module.scss'

const InstitutionalText: React.FC = () => {
  return (
    <div className={styles.institutionalText}>

      <p>Para acrescentar vídeo ao conteúdo, é preciso que ele esteja hospedado em uma plataforma que disponibilize código embed. Nós da Netshow.me disponibilizamos para você acesso a plataforma Netshow.me Live, que permite upload de vídeo e fornece <b style={{ color: 'rgba(238, 57, 101, 1)' }}>código embed</b>.</p>

      <p>Agora vamos te ensinar o passo a passo completo de upload de vídeo na plataforma Netshow.me Live. E passar pelos campos fundamentais a serem preenchidos no momento da criação do conteúdo de vídeo na OTT. Caso tenha optado pelo embed de outra plataforma, pule para o título ”Como fazer colocar vídeo no conteúdo”.</p>

      <h2>Como fazer upload</h2>

      <p>Ao acessar, selecione no menu superior a opção Gerenciar vídeos, em seguida Criar vídeo. Para começar o processo de upload, selecione a opção Carregar vídeo. Ao abrir a janela de busca, localize o arquivo e o selecione. </p>

    </div>
  )
}

export default InstitutionalText