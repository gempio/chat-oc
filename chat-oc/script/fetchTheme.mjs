import { writeFile } from 'fs/promises';
import prettier from 'prettier';

const THEME_URL = 'https://design.eu.guestline.app';

async function getPrettierConfig(configPath = process.cwd()) {
  return (await prettier.resolveConfig(configPath)) ?? {};
}

async function fetchTheme() {
  const response = await fetch(`${THEME_URL}/api/theme?prefix=oc-ocboilerplate-`);
  const theme = await response.json();

  return theme;
}

async function addThemeFile(theme) {
  const prettierConfig = await getPrettierConfig();
  const file = prettier.format(
    `
// This file was autogenerated on ${new Date().toISOString()}.
// DO NOT EDIT THIS FILE.

import type { ThemeOptions } from '@mui/material/styles';

export const rezlynxTheme: ThemeOptions = ${JSON.stringify(theme, null, 2)};
`,
    { ...prettierConfig, parser: 'typescript' }
  );
  await writeFile('./src/client/rezlynxTheme.ts', file, 'utf-8');
}

async function main() {
  const theme = await fetchTheme();
  await addThemeFile(theme);
}

main().catch((err) => {
  console.error('There was a problem downloading the theme:', err.message);
  process.exit(1);
});
