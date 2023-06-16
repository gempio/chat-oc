import './init';
import React from 'react';
import { AuthProvider } from '@guestlinelabs/react-auth';
import { Configuration, OpenAIApi } from "openai";

import { ClientProps, GetData } from './types';
import { AppInsightsContextProvider } from './client/contexts/AppInsightsContext';
import { I18nProvider } from './client/i18nConfig';
import { ErrorBoundary } from './client/ErrorBoundary';
import { ErrorFallBack } from './client/ErrorFallBack';
import App from './client/App';
import { MuiProvider } from './client/theme/MUI';

type DataAttributeKey = `data-${string}`;
declare module 'react' {
  interface HTMLAttributes<T> {
    [dataAttribute: DataAttributeKey]: string;
  }
}

interface IndexProps extends ClientProps {
  getData: GetData;
}

const configuration = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(configuration);

const Index = (props: IndexProps) => {
  const { lang, siteId, instrumentationKey } = props;

  React.useEffect(() => {
    document.body.appendChild(
      Object.assign(document.createElement('link'), {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      })
    );
    document.body.appendChild(
      Object.assign(document.createElement('link'), {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: ''
      })
    );
    document.body.appendChild(
      Object.assign(document.createElement('link'), {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Syne:wght@400;500;600;700&display=swap'
      })
    );
  }, []);

  return (
    <AuthProvider>
      <AppInsightsContextProvider
        instrumentationKey={instrumentationKey}
        userId={`${siteId}_[replaceWithUiqueId]`}
      >
        <I18nProvider language={lang}>
          <MuiProvider>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              <App openai={openai} />
            </ErrorBoundary>
          </MuiProvider>
        </I18nProvider>
      </AppInsightsContextProvider>
    </AuthProvider>
  );
};

export default Index;
