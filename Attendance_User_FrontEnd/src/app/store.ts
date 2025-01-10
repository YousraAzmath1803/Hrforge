import { createTheme } from '@mui/material';
import { create } from 'zustand';


interface DarkModeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
// Define light and dark theme configurations
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4615B2',
    },
    background: {
      default: '#FFFFFF', // Light mode background color
    },
    text: {
      primary: '#000000', // Light mode text color
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000', // Dark mode primary color (black)
    },
    background: {
      default: '#121212', // Dark mode background color (blackish)
    },
    text: {
      primary: '#FFFFFF', // Dark mode text color (white)
    },
  },
});
export const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
//npm install zustand
export {lightTheme,darkTheme};