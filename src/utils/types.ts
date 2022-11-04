import React, { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';

/** Exposes all props of a component and overrides those with `P` in case of conflict */
export type WithComponentProps<T extends React.ElementType, P = {}> = Overwrite<
  ComponentPropsWithoutRef<T>,
  P
>;

/** Removes readonly modifiers from every porperty from type */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/** Intersect A & B but with B overriding A's properties in case of conflict */
export type Overwrite<A, B> = Omit<A, keyof B> & B;

/** Use inside a `forwardRef` as the type of the second argument */
// eslint-disable-next-line
export type PolymorphicRef = React.ForwardedRef<any>;

/**
 * Used for polymorphic props. Since we are using generics, typescript won't know
 * what our props will be until it is used, this type makes it so that props
 * such as `className` and `children` are fully typed when prematurely accessing it.
 */
export type BasePolymorphicProps<T extends React.ElementType> =
  React.PropsWithChildren<{
    as?: T;
    className?: string;
  }>;

/**
 * manually copies React.`FC`'s properties excluding it's call signature, React doesn't seem to
 * provide these outside of FC and it's complicated to remove `FC`'s signature so this is the second
 * best option.
 */
export type PolymorphicComponentProperties<P = {}> = {
  displayName?: string | undefined;
  propTypes?: React.WeakValidationMap<P>;
  // eslint-disable-next-line
  contextTypes?: React.ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
};

export type PolymorphicPropsWithoutRef<
  T extends React.ElementType,
  P extends Record<string, unknown> = {},
> = Overwrite<
  ComponentPropsWithoutRef<T>,
  Overwrite<BasePolymorphicProps<T>, P>
>;

export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  P extends Record<string, unknown> = {},
> = Overwrite<ComponentPropsWithRef<T>, Overwrite<BasePolymorphicProps<T>, P>>;

export type PolymorphicFunctionComponent<
  D extends React.ElementType,
  P extends Record<string, unknown> = {},
> = {
  <T extends React.ElementType = D>(
    props: PolymorphicPropsWithoutRef<T, P>,
  ): React.ReactElement | null;
} & PolymorphicComponentProperties<P>;

export type PolymorphicFunctionComponentWithRef<
  D extends React.ElementType,
  P extends Record<string, unknown> = {},
> = {
  <T extends React.ElementType = D>(
    props: PolymorphicPropsWithRef<T, P>,
  ): React.ReactElement | null;
} & PolymorphicComponentProperties<P>;
