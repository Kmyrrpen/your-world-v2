import { proxy } from 'valtio';
import { Action, createReducer } from 'wuuber';

interface ThemeState {
  theme: 'dark' | 'light';
}

// TODO: change to user preference then local storage
export const theme = proxy<ThemeState>({
  theme: 'light',
});

const themeReducer = createReducer('theme', {
  toggleTheme: (action: Action) => {
    theme.theme = theme.theme === 'light' ? 'dark' : 'light';
  },
});

export const { toggleTheme } = themeReducer.actions;
export const themeFlows = [themeReducer];
