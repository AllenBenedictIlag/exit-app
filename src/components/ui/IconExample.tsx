import React from 'react';
import FileIcon from '@icons/file.svg';
import GlobeIcon from '@icons/globe.svg';
import WindowIcon from '@icons/window.svg';

interface IconProps {
  name: 'file' | 'globe' | 'window';
  size?: number;
  color?: string;
  className?: string;
}

export default function Icon({ name, size = 24, color = 'currentColor', className = '' }: IconProps) {
  const iconProps = {
    width: size,
    height: size,
    color,
    className
  };

  switch (name) {
    case 'file':
      return <FileIcon {...iconProps} />;
    case 'globe':
      return <GlobeIcon {...iconProps} />;
    case 'window':
      return <WindowIcon {...iconProps} />;
    default:
      return <FileIcon {...iconProps} />;
  }
} 