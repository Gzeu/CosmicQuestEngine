import { motion } from 'framer-motion';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md p-6 ${hover ? 'hover:shadow-lg' : ''} ${className}`}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
