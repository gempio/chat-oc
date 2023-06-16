import { act, render, RenderResult } from '@testing-library/react';
import App from '../../src/client/App';
import { AppInsightsContext } from '../../src/client/contexts/AppInsightsContext';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const getMockAppInsights = () =>
  ({
    trackEvent: vi.fn(),
    trackTrace: vi.fn(),
    trackException: vi.fn(),
    flush: vi.fn()
  } as unknown as ApplicationInsights);

export const renderComponent = async (): Promise<RenderResult> => {
  let renderedComponent: RenderResult;
  await act(async () => {
    renderedComponent = render(
      <AppInsightsContext.Provider value={{ appInsights: getMockAppInsights() }}>
        <App />
      </AppInsightsContext.Provider>
    );
  });
  return renderedComponent!;
};
