import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type ToggleProps = {
  open: boolean;
  toggle: () => void;
};

export function NavbarToggle({ open, toggle }: ToggleProps) {
  return (
    <button
      onClick={toggle}
      aria-label='navbar-toggle'
      className={cn(
        'flex justify-center z-50 rounded-full p-4 relative',
        open ? 'bg-black' : 'bg-white'
      )}
    >
      <div className='relative flex flex-col gap-1 w-6'>
        <motion.div
          initial={false}
          animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn('bg-black h-0.5 w-full origin-center', open ? 'bg-white' : 'bg-black')}
        />
        <motion.div
          initial={false}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className='bg-black h-0.5 w-full'
        />
        <motion.div
          initial={false}
          animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn('bg-black h-0.5 w-full origin-center', open ? 'bg-white' : 'bg-black')}
        />
      </div>
    </button>
  );
}
