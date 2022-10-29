import { proxy } from 'valtio';
import { createReducer } from 'wuuber';

export type ThemeType = "dark" | "light";

interface ThemeState {
  theme: ThemeType;
}

// TODO: change to user preference then local storage
export const theme = proxy<ThemeState>({
  theme: 'light',
});

const themeActions = createReducer('theme', {
  toggleTheme: () => {
    theme.theme = theme.theme === 'light' ? 'dark' : 'light';
  },
});

export const { toggleTheme } = themeActions.actions;
export const themeFlows = [themeActions];
