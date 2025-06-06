
export const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren"
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

export const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const desktopItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3
    }
  }),
};