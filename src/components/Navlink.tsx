import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Navlink: React.FC<LinkProps> = ({ className, ...props }) => {
  return (
    <Link
      className={twMerge("p-1 text-sm flex gap-2 font-sans font-bold", className)}
      {...props}
    />
  );
};

export default Navlink;
