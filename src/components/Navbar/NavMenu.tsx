import { PropsWithChildren } from 'react';
import classNames from 'classnames';

type Props = {
  toggle: boolean;
};

const NavMenu: React.FC<PropsWithChildren<Props>> = ({ toggle, children }) => {
  return (
    <div
      id="navbar-default"
      className={classNames('w-full md:ml-auto md:block md:w-auto', {
        hidden: !toggle,
      })}
    >
      <ul className="absolute top-full left-0 z-50 flex w-full flex-col border border-gray-200 bg-white dark:border-gray-600 dark:bg-black md:static md:flex-row md:items-center md:gap-7  md:border-0 md:bg-transparent md:dark:bg-transparent">
        {children}
      </ul>
    </div>
  );
};

export default NavMenu;
