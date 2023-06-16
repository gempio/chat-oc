import { screen } from '@testing-library/react';
import { renderComponent } from './utils/renderApp';

describe('App', () => {
  test('renders the app', async () => {
    await renderComponent();

    expect(screen.getByText('Hello World! This is ocboilerplate')).toBeTruthy();
  });
});
