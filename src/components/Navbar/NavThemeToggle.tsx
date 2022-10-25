import classNames from 'classnames';
import ThemeToggle from '../ThemeToggle';

type Props = {
  className?: string;
};

const NavThemeToggle: React.FC<Props> = ({ className }) => {
  return (
    <ThemeToggle
      className={classNames(className, 'ml-auto md:order-3 md:ml-0')}
    />
  );
};

export default NavThemeToggle;
