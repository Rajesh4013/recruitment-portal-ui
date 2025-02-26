import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default MyApp; 