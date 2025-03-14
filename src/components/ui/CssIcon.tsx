import React from 'react';
import styles from '@/styles/icons.module.css';

interface CssIconProps {
  name: 'file' | 'globe' | 'window';
  size?: number;
  className?: string;
}

const iconClassMap = {
  file: styles.fileIcon,
  globe: styles.globeIcon,
  window: styles.windowIcon,
};

const CssIcon: React.FC<CssIconProps> = ({ 
  name, 
  size = 24, 
  className = '' 
}) => {
  const iconClass = iconClassMap[name] || iconClassMap.file;
  
  return (
    <span 
      className={`${iconClass} ${className}`}
      style={{ 
        width: size, 
        height: size 
      }}
      role="img"
      aria-label={`${name} icon`}
    />
  );
};

export default CssIcon; 