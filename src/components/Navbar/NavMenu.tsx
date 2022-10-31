import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  toggle: boolean;
} & React.ComponentPropsWithRef<'div'>;

const NavMenu = forwardRef<HTMLDivElement, Props>(
  ({ toggle, children, className, ...props }, ref) => (
    <div
      ref={ref}
      id="navbar-default"
      className={twMerge(
        'w-full md:ml-auto md:block md:w-auto',
        !toggle && 'hidden',
        className,
      )}
      {...props}
    >
      <ul className="absolute top-full left-0 z-40 flex w-full flex-col rounded border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-dark-200 md:static md:flex-row md:items-center md:gap-9  md:border-0 md:bg-transparent md:dark:bg-transparent">
        {children}
      </ul>
    </div>
  ),
);

NavMenu.displayName = 'NavMenu';

export default NavMenu;
