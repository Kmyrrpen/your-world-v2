import Icon from '../Icon';
import { ReactComponent as Sun } from '@/assets/sun.svg';
import { ReactComponent as Moon } from '@/assets/moon.svg';
import useTheme from '@/app/theme/hooks';
import { dispatch } from '@/app/dispatch';
import { toggleTheme } from '@/app/theme';

const NavThemeToggle: React.FC = () => {
  const theme = useTheme();
  const onToggle = () => dispatch(toggleTheme());
  return (
    <Icon onClick={onToggle} className="ml-auto md:order-3 md:ml-0">
      <Sun
        className={`
         ${theme === 'dark' && 'hidden'}
         h-auto dark:fill-white
        `}
      />
      <Moon
        className={`
         ${theme === 'light' && 'hidden'}
         h-auto dark:fill-white
         `}
      />
    </Icon>
  );
};

export default NavThemeToggle;
