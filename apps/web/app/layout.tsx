import './globals.css';
import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
