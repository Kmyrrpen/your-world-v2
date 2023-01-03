import { Overwrite } from "@/utils/types";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export type ModalProps<P = {}> = Overwrite<
  {
    onClose: () => void;
  },
  P
>;

const modalRoot = document.querySelector("#modal-portal") as HTMLElement;
const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  onClose,
  children,
}) => {
  return createPortal(
    <div>
      {/* stop content from being cut on scroll when content height is longer than the viewport */}
      <div className="fixed top-0 left-0 z-50 flex h-auto min-h-full w-full items-center justify-center p-4">
        {/* modal container */}
        <div className="relative z-20 flex min-h-[10rem] w-full justify-start rounded bg-white p-4 md:max-w-screen-sm lg:max-w-screen-md">
          {children}
        </div>
        {/* modal background */}
        <div
          className="absolute top-0 left-0 z-10 h-full w-full bg-gray-800 opacity-40"
          onClick={onClose}
        />
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
