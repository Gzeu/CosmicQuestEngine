import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

type AlertProps = {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
};

const variants = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

const icons = {
  success: CheckIcon,
  error: XMarkIcon,
  info: InformationCircleIcon
};

export function Alert({ type, message, onClose }: AlertProps) {
  const Icon = icons[type];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`border rounded-md p-4 flex items-center gap-3 ${variants[type]}`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-auto">
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
