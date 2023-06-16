import React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FallbackProps } from './ErrorBoundary';
import { useAppInsights } from './contexts/AppInsightsContext';

const ErrorFallBack: React.FC<FallbackProps> = ({ error, resetAndNotify, resetErrorState }) => {
  const { t } = useTranslation('main');
  const appInsights = useAppInsights();

  React.useEffect(() => {
    appInsights.trackException({
      exception: error,
      properties: { message: 'Application crashed' }
    });
  }, [appInsights, error]);

  return (
    <Box role="alert" padding="16px">
      <Typography variant="h6" align="center">
        {t('application_crashed_message')}
      </Typography>
      {!!error.message && <Box margin="24px 0">{error.message}</Box>}
      <Box textAlign="center">
        <Button variant="contained" onClick={resetAndNotify}>
          {t('reload')}
        </Button>
      </Box>
    </Box>
  );
};

export { ErrorFallBack };
