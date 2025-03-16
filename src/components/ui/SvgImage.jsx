import React from 'react';
import Image from 'next/image';

const icons = {
  // Original icons
  file: '/icons/file.svg',
  globe: '/icons/globe.svg',
  window: '/icons/window.svg',
  
  // Social media icons
  github: '/icons/github.svg',
  facebook: '/icons/facebook.svg',
  twitter: '/icons/twitter.svg',
  
  // Form control icons
  eye: '/icons/eye.svg',
  eyeOff: '/icons/eye-off.svg',
  mail: '/icons/mail.svg',
  lock: '/icons/lock.svg',
  user: '/icons/user.svg',
  check: '/icons/check.svg',
  x: '/icons/x.svg',
  alertCircle: '/icons/circle-alert.svg',
  
  // Navigation icons
  home: '/icons/house.svg',
  users: '/icons/users.svg',
  fileText: '/icons/file-text.svg',
  barChart2: '/icons/chart-bar-big.svg',
  settings: '/icons/settings.svg',
  logOut: '/icons/log-out.svg',
  menu: '/icons/menu.svg',
  
  // Feature icons
  checkCircle: '/icons/circle-check.svg',
  download: '/icons/download.svg',
  filter: '/icons/filter.svg',
  userPlus: '/icons/user-plus.svg',
  userMinus: '/icons/user-minus.svg',
  calendar: '/icons/calendar.svg',
  save: '/icons/save.svg',
  refreshCw: '/icons/refresh-cw.svg'
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