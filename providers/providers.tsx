'use client';

import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { makeStore } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react';

const store = makeStore();

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={(store as any).persistor}>
      <ThemeProvider enableSystem attribute="class">
        {children}
        <ToastContainer className='bottom-0' position='bottom-right'/>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}