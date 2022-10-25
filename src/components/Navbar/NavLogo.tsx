import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '@/assets/logo.svg';
import { ReactComponent as LogoText } from '@/assets/logo-text-horizontal.svg';

type Props = {
  hasText?: boolean;
  className?: string;
};

const NavLogo: React.FC<Props> = ({ hasText, className }) => {
  return (
    <Link to="/" className={classNames(className, 'flex items-center')}>
      <span className="sr-only">Back to homepage</span>
      <Logo
        className={classNames(
          { 'sm:hidden': hasText },
          'w-8 fill-black dark:fill-white sm:w-10',
        )}
      />
      {hasText ? (
        <LogoText className=" hidden h-auto fill-black dark:fill-white sm:block" />
      ) : null}
    </Link>
  );
};

export default NavLogo;
