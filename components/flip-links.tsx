'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const RevealLinks = () => {
  return (
    <section className='grid place-content-center gap-2 px-8 py-24 text-black w-full h-full'>
      <FlipLink href='#'>Home</FlipLink>
      <FlipLink href='#'>Linkedin</FlipLink>
      <FlipLink href='#'>Facebook</FlipLink>
      <FlipLink href='#'>Instagram</FlipLink>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link href={href}>
      <motion.div
        initial='initial'
        whileHover='hovered'
        whileTap='hovered'
        className='relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl'
      >
        <div>
          {children.split('').map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: '-100%',
                },
              }}
              transition={{
                duration: DURATION,
                ease: 'easeInOut',
                delay: STAGGER * i,
              }}
              className='inline-block'
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <div className='absolute inset-0'>
          {children.split('').map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: '100%',
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                duration: DURATION,
                ease: 'easeInOut',
                delay: STAGGER * i,
              }}
              className='inline-block'
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Link>
  );
};
