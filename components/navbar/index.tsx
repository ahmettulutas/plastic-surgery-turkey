'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RevealLinks } from '../flip-links';
import { NavbarToggle } from './navbar-toggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.8, 0.5, 1],
      },
    },
    closed: {
      x: '-100%',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.8, 0.5, 1],
      },
    },
  };

  return (
    <nav className='fixed top-0 p-4 w-full border border-yellow-200'>
      <NavbarToggle open={isOpen} toggle={() => setIsOpen((pv) => !pv)} />

      <motion.ul
        className='fixed bg-white text-black z-30 top-0 h-screen right-0 border border-yellow-200 w-screen will-change-transform'
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
      >
        <RevealLinks />
      </motion.ul>
    </nav>
  );
}
