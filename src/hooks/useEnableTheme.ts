import { useEffect } from 'react';
import { useUserStore } from '@/app/user-preference';

const useEnableTheme = () => {
  const theme = useUserStore((state) => state.theme);
  useEffect(() => {
    const body = document.body;
    theme === 'dark'
      ? body.classList.add('dark')
      : body.classList.remove('dark');
  }, [theme]);
};

export default useEnableTheme;
