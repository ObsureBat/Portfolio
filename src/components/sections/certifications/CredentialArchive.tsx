'use client';

import React, { useState } from 'react';
import { CREDENTIALS_DATA } from '@/data/certificationsData';
import { CredentialDocument } from './CredentialDocument';
import { CredentialIndex } from './CredentialIndex';

export function CredentialArchive() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = CREDENTIALS_DATA[activeIndex] || CREDENTIALS_DATA[0];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Featured Physical Document Surface (7 cols on desktop, primary on mobile) */}
        <div className="lg:col-span-7 order-1">
          <CredentialDocument
            item={activeItem}
            currentIndex={activeIndex}
            totalCount={CREDENTIALS_DATA.length}
          />
        </div>

        {/* Compact Vertical Proof Index (5 cols on desktop, secondary on mobile) */}
        <div className="lg:col-span-5 order-2">
          <CredentialIndex
            items={CREDENTIALS_DATA}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default CredentialArchive;
