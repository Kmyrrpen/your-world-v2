import React from "react";
import { PolyRefFunction } from "react-polymorphed";
import { MutableRefObject } from "react";
import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

/** forwardRef but for polymorphic components */
export const polyRef = React.forwardRef as PolyRefFunction;

/** attach your ref to the register function from react-hook-form */
export const registerWithRef = <T extends FieldValues = FieldValues>(
  register: UseFormRegister<T>,
) => {
  return <Ref, N extends FieldPath<T>>(
    name: N,
    // add ref attribute to second arg of register
    options: RegisterOptions<T, N> & { ref: MutableRefObject<Ref> },
  ): ReturnType<typeof register> => {
    // modify returned ref so that we also attach the instance to our ref.
    const { ref, ...newOptions } = options;
    const { ref: returnedRef, ...rest } = register(name, newOptions);
    // eslint-disable-next-line
    const newRef = (e: any) => {
      returnedRef(e);
      ref.current = e;
    };

    return { ref: newRef, ...rest };
  };
};

export const getScrollbarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // @ts-ignore parent node is document
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

export const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${month}/${day}/${year}`;
};
