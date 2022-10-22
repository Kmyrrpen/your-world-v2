import { useSnapshot } from 'valtio';
import { theme } from '.';

export const useTheme = () => {
  const { theme: curr } = useSnapshot(theme);
  return curr;
};

export default useTheme;
