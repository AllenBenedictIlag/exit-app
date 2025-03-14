import React from 'react';
import { SVGProps } from 'react';

// Import SVG files directly
import FileSvg from '@/icons/file.svg';
import GlobeSvg from '@/icons/globe.svg';
import WindowSvg from '@/icons/window.svg';

export type IconType = 'file' | 'globe' | 'window';

interface SvgIconProps extends SVGProps<SVGSVGElement> {
  name: IconType;
  size?: number;
}

const SvgIcon: React.FC<SvgIconProps> = ({ 
  name, 
  size = 24, 
  width, 
  height,
  ...props 
}) => {
  const iconProps = {
    width: width || size,
    height: height || size,
    ...props
  };

  switch (name) {
    case 'file':
      return <FileSvg {...iconProps} />;
    case 'globe':
      return <GlobeSvg {...iconProps} />;
    case 'window':
      return <WindowSvg {...iconProps} />;
    default:
      return null;
  }
};

export default SvgIcon; 