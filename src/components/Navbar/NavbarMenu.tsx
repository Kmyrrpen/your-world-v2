import { PropsWithChildren, useCallback, useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import IconButton from '../IconButton';
import { Icons } from '../Icons';

const NavbarMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const [show, setShow] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // close menu when click outside of menu, don't trigger if on button
  const outsideToggler = useCallback(
    (e: MouseEvent) => {
      const el = buttonRef.current;
      if (!show || !el || el.contains(e.target as Node)) return;
      setShow((prev) => !prev);
    },
    [show, buttonRef],
  );

  useOnClickOutside(menuRef, outsideToggler);

  return (
    <div>
      <IconButton
        ref={buttonRef}
        onClick={() => setShow((prev) => !prev)}
        className="lg:hidden"
      >
        <Icons.Menu />
      </IconButton>
      <ul
        ref={menuRef}
        className={`
          ${!show ? 'hidden' : ''}
          absolute top-full left-0 w-full border border-neutral-300 bg-white lg:static lg:flex lg:border-none
        `}
      >
        {children}
      </ul>
    </div>
  );
};

export default NavbarMenu;
