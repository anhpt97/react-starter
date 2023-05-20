import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

export const Intl = ({ children }) => {
  const { locale, messages } = useSelector((state: any) => state.language);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};
