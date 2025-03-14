'use client';

import React from 'react';
import SvgImage from '@/components/ui/SvgImage';

export default function IconsTestPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Icons Test Page (Using Image)</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-4 border rounded">
          <SvgImage name="file" size={48} />
          <p className="mt-2">File Icon</p>
        </div>
        <div className="flex flex-col items-center p-4 border rounded">
          <SvgImage name="globe" size={48} />
          <p className="mt-2">Globe Icon</p>
        </div>
        <div className="flex flex-col items-center p-4 border rounded">
          <SvgImage name="window" size={48} />
          <p className="mt-2">Window Icon</p>
        </div>
      </div>
    </div>
  );
} 