import useTheme from '@/app/theme/hooks';
import { useEffect } from 'react';

const useEnableTheme = () => {
  const theme = useTheme();

  useEffect(() => {
    const body = document.body;
    theme === 'dark'
      ? body.classList.add('dark')
      : body.classList.remove('dark');
  }, [theme]);
};

export default useEnableTheme;
