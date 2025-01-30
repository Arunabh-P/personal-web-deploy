import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from './ThemeProviders';
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
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default ProvidersWrapper;
