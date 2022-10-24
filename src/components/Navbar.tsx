import { useWorld } from '@/app/world/hooks';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import { ReactComponent as LogoText } from '@/assets/logo-text-horizontal.svg';

import Button from './Button';
import classNames from 'classnames';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const world = useWorld();

  // only on mobile
  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle((prev) => !prev);

  return (
    <nav className="relative mb-9 py-2 sm:py-4 md:mb-12">
      <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
        <Link to="/" className="flex items-center">
          <Logo className="w-8 fill-black dark:fill-white sm:hidden" />
          <LogoText className=" hidden h-auto fill-black dark:fill-white sm:block" />
        </Link>

        <ThemeToggle className="ml-auto md:order-3 md:ml-0" />

        <button
          onClick={onToggle}
          type="button"
          className="inline-flex items-center rounded-lg p-2 text-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-black dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>

          {/* Menu SVG */}
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div
          className={classNames(
            { hidden: !toggle },
            'w-full md:ml-auto md:block md:w-auto',
          )}
          id="navbar-default"
        >
          <ul className="absolute top-full left-0 flex w-full flex-col border border-gray-200 bg-white dark:border-gray-600 dark:bg-black md:static md:flex-row md:items-center md:gap-7  md:border-0 md:bg-transparent md:dark:bg-transparent">
            <li>
              <Link
                to={`/${world.id}`}
                className="block rounded py-2 px-4 font-medium md:p-0 md:text-lg"
                aria-current="page"
              >
                dashboard
              </Link>
            </li>
            <li>
              <Link
                to={`/${world.id}/tags`}
                className="block rounded py-2 px-4 font-medium md:p-0 md:text-lg"
                aria-current="page"
              >
                see tags
              </Link>
            </li>
            <li>
              <Link
                to={`/${world.id}/new`}
                className="block rounded py-2 px-4 font-medium md:hidden"
                aria-current="page"
              >
                create new
              </Link>
              <Button
                as={Link}
                className="hidden md:inline-block"
                to={`/${world.id}/new`}
              >
                New Note
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
