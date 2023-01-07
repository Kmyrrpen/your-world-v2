import { PropsWithChildren } from "react";
import { twJoin } from "tailwind-merge";

type Props = PropsWithChildren<{
  isHidden: boolean;
  inputValue: string;
}>;

const SearchEmptyMessage: React.FC<Props> = ({
  isHidden,
  inputValue,
  children,
}) => {
  return (
    <div
      className={twJoin(
        "flex h-40 w-full items-center justify-center text-xl text-gray-400",
        isHidden && "hidden",
      )}
    >
      {!inputValue.length ? (
        children
      ) : (
        <span>No results for &#34;{inputValue}&#34;</span>
      )}
    </div>
  );
};

export default SearchEmptyMessage;
