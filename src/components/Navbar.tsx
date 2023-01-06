import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const Navbar: React.FC<ComponentPropsWithoutRef<"nav">> = ({
  className,
  ...props
}) => {
  return (
    <nav
      className={twMerge("mb-12 flex justify-end py-2 gap-1", className)}
      {...props}
    />
  );
};

export default Navbar;
