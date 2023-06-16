import React from 'react';

import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { createTheme, PaletteColorOptions, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';
import { localTheme, rezlynxTheme } from './theme';
import { deepmerge } from '@mui/utils';

declare module '@mui/material' {
  interface Color {
    '250': string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: SimplePaletteColorOptions & ColorPartial;
    primaryColourPartial: ColorPartial;
    secondaryColourPartial: ColorPartial;
    errorColourPartial: ColorPartial;
    warningColourPartial: ColorPartial;
    infoColourPartial: ColorPartial;
    successColourPartial: ColorPartial;
  }

  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    primaryColourPartial?: PaletteColorOptions;
    secondaryColourPartial?: PaletteColorOptions;
    errorColourPartial?: PaletteColorOptions;
    warningColourPartial?: PaletteColorOptions;
    infoColourPartial?: PaletteColorOptions;
    successColourPartial?: PaletteColorOptions;
  }

  interface PaletteColor {
    main: string;
    hovered: string;
    pressed: string;
    contrastText: string;
  }

  interface SimplePaletteColorOptions {
    hovered?: string;
    pressed?: string;
  }

  interface TypeText {
    link?: string;
    error?: string;
  }

  interface TypographyVariants {
    h4Regular: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    bodyLargeBold: React.CSSProperties;
    bodyBold: React.CSSProperties;
    bodySmall: React.CSSProperties;
    bodySmallBold: React.CSSProperties;
    emphasisLarge: React.CSSProperties;
    emphasisDefault: React.CSSProperties;
    emphasisSmall: React.CSSProperties;
    navigation: React.CSSProperties;
    overlineSmall: React.CSSProperties;
    overlineDefault: React.CSSProperties;
    tagLarge: React.CSSProperties;
    tagDefault: React.CSSProperties;
    tagSmall: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h4Regular?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    bodyLargeBold?: React.CSSProperties;
    bodyBold?: React.CSSProperties;
    bodySmall?: React.CSSProperties;
    bodySmallBold?: React.CSSProperties;
    emphasisLarge?: React.CSSProperties;
    emphasisDefault?: React.CSSProperties;
    emphasisSmall?: React.CSSProperties;
    navigation?: React.CSSProperties;
    overlineSmall?: React.CSSProperties;
    overlineDefault?: React.CSSProperties;
    tagLarge?: React.CSSProperties;
    tagDefault?: React.CSSProperties;
    tagSmall?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyLarge: true;
    bodyLargeBold: true;
    emphasisLarge: true;
    emphasisDefault: true;
    emphasisSmall: true;
    navigation: true;
    overlineSmall: true;
    overlineDefault: true;
    bodyBold: true;
    bodySmall: true;
    bodySmallBold: true;
    h4Regular: true;
    tagLarge: true;
    tagDefault: true;
    tagSmall: true;
  }
}

declare module '@mui/material/Button/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    buttonTertiary: true;
  }
}

declare module '@mui/material/Chip/Chip' {
  interface ChipPropsVariantOverrides {
    tag: true;
  }
  interface ChipPropsColorOverrides {
    tagPrimary: true;
  }
}

declare module '@mui/material/IconButton/IconButton' {
  interface IconButtonPropsColorOverrides {
    accent: true;
    tertiary: true;
    ghost: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    iconButtonPrimary: true;
    iconButtonAccent: true;
    iconButtonSecondary: true;
    iconButtonTertiary: true;
    iconButtonGhost: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    primaryColourPartial?: PaletteColorOptions;
    secondaryColourPartial?: PaletteColorOptions;
    tertiary?: PaletteColorOptions;
    tertiaryColourPartial?: PaletteColorOptions;
    successColourPartial?: PaletteColorOptions;
    infoColourPartial?: PaletteColorOptions;
    warningColourPartial?: PaletteColorOptions;
    errorColourPartial?: PaletteColorOptions;
    buttonTertiary?: PaletteColorOptions;
    ghost?: PaletteColorOptions;
    tagPrimary?: PaletteColorOptions;
    tagSecondary?: PaletteColorOptions;
    tagTertiary?: PaletteColorOptions;
    tagSubtle?: PaletteColorOptions;
  }
}

interface MuiProviderProps {
  children?: React.ReactNode;
}

export const MuiProvider = ({ children }: MuiProviderProps) => {
  const theme = createTheme(deepmerge(rezlynxTheme, localTheme));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline style={{ display: 'inline' }}>{children}</ScopedCssBaseline>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
