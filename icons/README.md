# Icons

This directory contains SVG icons used throughout the Exit Interview System.

## Available Icons

- `file.svg` - Document/file icon
- `globe.svg` - Globe/world icon
- `next.svg` - Next.js logo
- `vercel.svg` - Vercel logo
- `window.svg` - Window/application icon

## Usage

These icons can be imported and used in components as needed.

Example:
```jsx
import Image from 'next/image';
import fileIcon from '@/icons/file.svg';

export default function MyComponent() {
  return (
    <div>
      <Image src={fileIcon} alt="File" width={24} height={24} />
    </div>
  );
}
``` 