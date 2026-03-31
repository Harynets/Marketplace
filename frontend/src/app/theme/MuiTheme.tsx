// Theme with custom colors for MUI components
"use client";

import { ReactNode } from "react";
import { createTheme, PaletteColorOptions, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

declare module "@mui/material/styles" {
    interface CustomPalette {
        main: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        main: true;
    }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    palette: {
        main: createColor("#5fb022"),
    },
});

export default function MuiTheme({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
