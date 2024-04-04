import { createTheme } from '@mui/material/styles';
import { cyan, green, orange, purple } from '@mui/material/colors';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: orange[500],
        },
        secondary: { main: green[500], }
    }
});


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: orange[500],
        },
        secondary: {
            main: green[500],
        }
    }
})

const themes = {
    [Theme.DARK]: darkTheme,
    [Theme.LIGHT]: lightTheme
}

export const getTheme = (theme: Theme) => {
    return themes[theme]
}
