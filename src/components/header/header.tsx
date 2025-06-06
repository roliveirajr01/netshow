import styles from './header.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, AvatarIcon } from '@icons';
import { navVariants } from '@helpers';

const menuItems = [
  { label: 'Categorias', href: '#' },
  { label: 'Assuntos', href: '#' },
  { label: 'Outras páginas', href: '#' },
  { label: 'Minha Lista', href: '#' },
  { label: 'Lives', href: '#' },
  { label: 'Fórum', href: '#' },
];

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={styles.header}>
      <button
        className={styles.navToggle}
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Toggle navigation menu"
      >
        &#9776;
      </button>

      <div className={styles.logo}>
        <div
          style={{
            width: 16,
            height: 16,
            background: '#999',
            borderRadius: 4,
          }}
        />
        <span>Logo</span>
      </div>

      <motion.nav
        className={`${styles.nav} ${navOpen ? styles.open : ''}`}
        initial="hidden"
        animate="visible"
        variants={navVariants(-20)}
      >
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <motion.li
              key={item.label}
              className={styles.navItem}
              variants={navVariants(-10)}
            >
              <a href={item.href}>{item.label}</a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      <div className={styles.rightIcons}>
        <span>
          <SearchIcon />
        </span>
        <span className={styles.avatarIcon}>
          <AvatarIcon />
        </span>
      </div>
    </header>
  );
}

export default Header