import '../styles/globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Web3 Shield — Blockchain Security Toolkit',
  description:
    'Protect your Web3 assets with wallet risk analysis, transaction scanning, and phishing detection. Risk scoring from 0–100.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-900 bg-grid">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-dark-500/30 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
            <p>Web3 Shield 🛡️ — Built for safer blockchain interactions</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
