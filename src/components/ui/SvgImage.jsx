import React from 'react';
import Image from 'next/image';

const icons = {
  file: '/icons/file.svg',
  globe: '/icons/globe.svg',
  window: '/icons/window.svg'
};

export default function SvgImage({ name, size = 24, alt = '', className = '' }) {
  const iconSrc = icons[name] || icons.file;
  
  return (
    <Image 
      src={iconSrc}
      width={size}
      height={size}
      alt={alt || `${name} icon`}
      className={className}
    />
  );
} 