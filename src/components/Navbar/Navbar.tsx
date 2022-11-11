import { PropsWithChildren } from "react";

const Navbar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav className="relative flex py-2 items-center justify-between my-3 md:mb-10 xl:mb-16">
      { children }
    </nav>
  )
};

export default Navbar;