import { WorldMetasObject } from '@/app/metas/types';
import { NotesObject, TagsObject } from '@/app/world/types';
import { ConvertStateObjToItem, RenderProp } from './types';
import React from 'react';

/**
 * Creates a render function given a react element type, types are very loose
 * on this function so make sure to give it the proper `P` for the `Component` passed
 * because typescript won't complain if they don't match.
 */
export const createDefaultRender = <P extends Record<string, unknown>>(
  Component: React.ElementType,
): RenderProp<P> => {
  return (props: P) => <Component {...props} />;
};

/**
 * The same as `createDefaultRender()` except that it assigns the component's `ref` with
 * the prop's `innerRef`.
 */
export const createDefaultRenderWithRef = <
  P extends Record<string, unknown> & { innerRef?: unknown },
>(
  Component: React.ElementType,
): RenderProp<P> => {
  return ({ innerRef, ...props }) => <Component ref={innerRef} {...props} />;
};

/**
 * Given a state object (`Notes`, `WorldMeta`, `Tags`), create an array from it.
 * There is an optional filter function to remove unwanted items.
 */
export const stateObjectToArray = <
  T extends NotesObject | WorldMetasObject | TagsObject,
>(
  obj: T,
  filterFunc?: (item: ConvertStateObjToItem<T>) => boolean,
): ConvertStateObjToItem<T>[] => {
  return Object.keys(obj).reduce<ConvertStateObjToItem<T>[]>((prev, key) => {
    const item = obj[key] as ConvertStateObjToItem<T>;
    if (filterFunc) {
      if (!filterFunc(item)) return prev;
    }
    prev.push(item);
    return prev;
  }, []);
};

/**
 * Given a hex color, returns true if whether or not the color is too dark to have black text placed on top of it,
 * short-hand syntax is currently not supported (i.e `#000`, `#ddd`)
 */
// https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
export const isColorDark = (hexColor: string) => {
  const color =
    hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor;
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
