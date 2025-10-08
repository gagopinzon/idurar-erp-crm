import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { selectAppSettings } from '@/redux/settings/selectors';
import antdLocale from './antdLocale';

export default function Localization({ children }) {
  const appSettings = useSelector(selectAppSettings);
  const langCode = appSettings?.idurar_app_language || 'es_es';
  const locale = antdLocale[langCode];

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: '#339393',
          colorLink: '#1640D6',
          borderRadius: 0,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
