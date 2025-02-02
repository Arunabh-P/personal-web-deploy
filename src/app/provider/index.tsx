import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from './ThemeProviders';
import ToastTemplate from '@/components/template/home/tost-template';
const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ToastTemplate />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default ProvidersWrapper;
