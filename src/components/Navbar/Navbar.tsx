import { PropsWithChildren } from 'react';

const Navbar: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <nav className="relative mb-9 py-2 sm:py-4 md:mb-10">
      <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
        {children}
      </div>
    </nav>
  );
};

export default Navbar;
