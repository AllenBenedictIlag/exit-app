'use client';

import React from 'react';
import SvgIcon from '@/components/ui/SvgIcon';

export default function IconsTestPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Icons Test Page</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-4 border rounded">
          <SvgIcon name="file" size={48} fill="currentColor" />
          <p className="mt-2">File Icon</p>
        </div>
        <div className="flex flex-col items-center p-4 border rounded">
          <SvgIcon name="globe" size={48} fill="currentColor" />
          <p className="mt-2">Globe Icon</p>
        </div>
        <div className="flex flex-col items-center p-4 border rounded">
          <SvgIcon name="window" size={48} fill="currentColor" />
          <p className="mt-2">Window Icon</p>
        </div>
      </div>
    </div>
  );
} 