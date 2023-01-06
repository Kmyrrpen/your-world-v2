import { twMerge } from "tailwind-merge";

const SearchInput: React.FC<React.ComponentPropsWithoutRef<"input">> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={twMerge(
        "mt-2 w-80 max-w-full border-b border-b-gray-400 text-base outline-none transition-colors focus:border-b-primary-100",
        className,
      )}
      {...props}
    />
  );
};

export default SearchInput;
