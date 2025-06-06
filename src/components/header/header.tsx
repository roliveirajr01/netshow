import styles from './header.module.scss';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, AvatarIcon } from '@icons';
import { desktopItemVariants, mobileItemVariants, mobileMenuVariants } from '@helpers';
import { useNavigate } from 'react-router-dom';
import { menuItems } from './menu-items';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className={styles.header}>
      <button
        className={styles.navToggle}
        onClick={() => setNavOpen(!navOpen)}
        aria-label={navOpen ? "Fechar menu" : "Abrir menu"}
      >
        <AnimatePresence mode="wait">
          {navOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 90, opacity: 1 }}
              exit={{ rotate: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ☰
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <div className={styles.logo} onClick={() => navigate('/')}>
        <div />
        <span>Logo</span>
      </div>

      {!isMobile && (
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menuItems.map((item, index) => (
              <motion.li
                key={item.label}
                className={styles.navItem}
                custom={index}
                variants={desktopItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <a href={item.href}>
                  {item.label}
                  <motion.div
                    className={styles.underline}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      )}

      {isMobile && (
        <AnimatePresence>
          {navOpen && (
            <motion.nav
              className={styles.navMobile}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              <motion.ul className={styles.navList}>
                {menuItems.map((item) => (
                  <motion.li
                    key={item.label}
                    className={styles.navItem}
                    variants={mobileItemVariants}
                  >
                    <a href={item.href}>{item.label}</a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      )}

      <div className={styles.rightIcons}>
        <motion.span whileHover={{ scale: 1.1 }}>
          <SearchIcon />
        </motion.span>
        <motion.span
          className={styles.avatarIcon}
          whileHover={{ scale: 1.1 }}
        >
          <AvatarIcon />
        </motion.span>
      </div>
    </header>
  );
}

export default Header;