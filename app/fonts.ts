import localFont from 'next/font/local';

export const pineappleBold = localFont({
  src: '../public/fonts/PineappleBold.otf',
  display: 'block',
  variable: '--font-pineapple-bold',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui'],
});

export const pineappleRegular = localFont({
  src: '../public/fonts/PineappleRegular.otf',
  display: 'block',
  variable: '--font-pineapple-regular',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui'],
});

