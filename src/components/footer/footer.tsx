import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          © Flow {currentYear}
        </div>

        <nav className={styles.footerLinks}>
          <a href="/privacy" className={styles.link}>Política de Privacidade</a>
          <a href="/terms" className={styles.link}>Termos de Uso</a>
        </nav>

        <div className={styles.credits}>
          Desenvolvido por Netshowme
        </div>
      </div>
    </footer>
  );
};

export default Footer;