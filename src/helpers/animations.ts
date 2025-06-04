
export const navVariants = (distance: number) => ({
  hidden: {
    opacity: 0,
    y: distance
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
});