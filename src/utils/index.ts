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
/**
 * Given a hex color, returns true if whether or not the color is too dark to have black text placed on top of it,
 * short-hand syntax is currently not supported (i.e `#000`, `#ddd`)
 */
// https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
export const isColorDark = (hexColor: string) => {
  const color =
    hexColor.charAt(0) === "#" ? hexColor.substring(1, 7) : hexColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L < 0.179;
};

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
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  // @ts-ignore parent node is document
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};
