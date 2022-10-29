import { ReactComponent as Sun } from '@/assets/sun.svg';
import { ReactComponent as Moon } from '@/assets/moon.svg';
import useTheme from '@/app/theme/hooks';
import { dispatch } from '@/app/dispatch';
import { toggleTheme } from '@/app/theme';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const ThemeToggle: React.FC<Props> = ({ className }) => {
  const theme = useTheme();
  const onToggle = () => dispatch(toggleTheme());

  return (
    <button
      className={classNames(
        'w-9 border-0 bg-none p-1 outline-none focus:ring-2 focus:ring-zinc-400',
        className,
      )}
      onClick={onToggle}
    >
      <Sun
        className={classNames(
          { hidden: theme === 'dark' },
          'h-auto w-full dark:fill-white',
        )}
      />
      <Moon
        className={classNames(
          { hidden: theme === 'light' },
          'h-auto w-full dark:fill-white',
        )}
      />
    </button>
  );
};

export default ThemeToggle;
