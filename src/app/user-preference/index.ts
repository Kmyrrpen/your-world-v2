import create from 'zustand';
import createStore from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import { Theme } from './types';
import { Action } from '@/utils/types';

interface State {
  theme: Theme;
}

interface UserStore extends State {
  toggleTheme: Action<Theme | undefined>;
}

/**
 * The recommended pattern for zustand is `create<T>()(...)`, instead
 * in here we do `create(immer<T>(...))`, because of a weird bug encountered
 * with unions. Although this solution comes with it's own batch of problems,
 * since we're only using immer anyways it should be fine
 */
export const userStore = createStore(
  immer<UserStore>((set) => ({
    theme: 'light',
    toggleTheme: (payload) => {
      set((state) => {
        if (payload) state.theme = payload;
        else state.theme = state.theme === 'light' ? 'dark' : 'light';
      });
    },
  })),
);

export const useUserStore = create(userStore);
