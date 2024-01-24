'use client';
import { LiFiWidget } from '@collabland/lifi-widget';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { WidgetEvents } from './WidgetEvents';
export function Widget() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');
  if (accessToken) {
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
  }
  useEffect(() => setMounted(true), []);
  return (
    <main>
      <WidgetEvents />
      {mounted && (
        <LiFiWidget
          config={{
            containerStyle: {
              border: `1px solid #565656`,
              borderRadius: '16px',
            },
          }}
          integrator="li.fi-playground"
        />
      )}
    </main>
  );
}
