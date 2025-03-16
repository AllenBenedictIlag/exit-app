import '../styles/globals.css';

export const metadata = {
  title: 'Exit Interview System',
  description: 'Electronic Manufacturing Company Exit Interview Management System',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <main>{children}</main>
      </body>
    </html>
  );
}