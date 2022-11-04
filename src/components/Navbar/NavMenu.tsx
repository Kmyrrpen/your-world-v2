import { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { ReactComponent as MenuIcon } from '@/assets/menu-icon.svg';
import Icon from '@/components/Icon';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const NavMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen((prev) => !prev);
  const menuRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);

  const listener = useCallback(
    (e: MouseEvent) => {
      if (
        !isOpen ||
        !iconRef.current ||
        iconRef.current.contains(e.target as Node)
      )
        return;
      onToggle();
    },
    [isOpen],
  );
  
  useOnClickOutside(menuRef, listener);

  return (
    <div className='md:ml-auto'>
      <Icon
        ref={iconRef}
        onClick={onToggle}
        type="button"
        className={'inline-flex items-center md:hidden'}
        aria-controls="navbar-default"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        <MenuIcon className="h-6 w-6" />
      </Icon>
      <div
        ref={menuRef}
        tabIndex={0}
        id="navbar-default"
        className={`md:w-auto', w-full md:ml-auto md:block
          ${!isOpen ? 'hidden' : ''}`}
      >
        <ul className="absolute top-full left-0 z-40 flex w-full flex-col rounded border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-dark-200 md:static md:flex-row md:items-center md:gap-9  md:border-0 md:bg-transparent md:dark:bg-transparent">
          {children}
        </ul>
      </div>
    </div>
  );
};

NavMenu.displayName = 'NavMenu';

export default NavMenu;
