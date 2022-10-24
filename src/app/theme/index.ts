import { proxy } from 'valtio';
import { createReducer } from 'wuuber';

interface ThemeState {
  theme: 'dark' | 'light';
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
