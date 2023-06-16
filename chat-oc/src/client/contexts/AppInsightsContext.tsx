import React, { useContext } from 'react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
export { SeverityLevel } from '@microsoft/applicationinsights-web';

interface AppInsightsContextValues {
  appInsights: ApplicationInsights;
}

export const AppInsightsContext = React.createContext<AppInsightsContextValues>(
  {} as AppInsightsContextValues
);

export const AppInsightsContextProvider = ({
  instrumentationKey,
  userId,
  children
}: React.PropsWithChildren<{ instrumentationKey: string; userId: string }>) => {
  const appInsights = React.useMemo(() => {
    const appInsights = new ApplicationInsights({
      config: {
        disableFetchTracking: false,
        instrumentationKey: instrumentationKey
      }
    });

    appInsights.loadAppInsights();

    appInsights.addTelemetryInitializer((envelope) => {
      if (envelope.tags) {
        envelope.tags['ai.cloud.role'] = 'ocboilerplate-oc';
        envelope.tags['ai.cloud.roleInstance'] = 'ocboilerplate-oc';
        envelope.tags['ai.user.id'] = userId;
      }
    });

    return appInsights;
  }, [instrumentationKey, userId]);

  return (
    <AppInsightsContext.Provider value={{ appInsights: appInsights }}>
      {children}
    </AppInsightsContext.Provider>
  );
};

export const useAppInsights = () => useContext(AppInsightsContext);
