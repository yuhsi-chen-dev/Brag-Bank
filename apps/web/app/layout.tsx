import './globals.css';
import type { Metadata } from 'next';
import QueryProvider from '../components/QueryProvider';
import ToastProvider from '../components/ToastProvider';

export const metadata: Metadata = {
  title: 'BragBank',
  description: 'Turn wins into resume bullets and STAR stories.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
