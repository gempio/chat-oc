import { initI18n } from './client/i18nConfig';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

initI18n();

// @ts-ignore
window.oc = { events: { fire: vi.fn() } };

afterEach(() => {
  cleanup();
});
