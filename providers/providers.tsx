'use client';

import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { makeStore } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const store = makeStore();

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const scriptProps =
  typeof window === 'undefined'
    ? undefined
    : ({ type: 'application/json' } as const);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={(store as any).persistor}>
          <ThemeProvider enableSystem attribute="class" scriptProps={scriptProps}>
            {children}
            <ToastContainer className="bottom-0" position="bottom-right" />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
