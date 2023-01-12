import { PropsWithChildren } from "react";

const LoadingMessage: React.FC<PropsWithChildren> = ({ children }) => {
  return <span className="inline-block p-3 text-lg">{children}</span>;
};

export default LoadingMessage;
