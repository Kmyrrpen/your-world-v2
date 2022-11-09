import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { createDefaultRenderWithRef } from '@/utils';
import {
  ComponentPropsWithInnerRef,
  Overwrite,
  PropsWithRender,
  RenderProp,
} from '@/utils/types';

/** The props that will be passed into `render`. */
type InjectedProps = PropsWithChildren<{ className: string }>;

/** If `render` key is undefined, Button will have this type. */
type SharedDefaultProps = ComponentPropsWithInnerRef<'button'>;

type PermanentProps = PropsWithRender<
  InjectedProps,
  {
    /** classes to override default classes with `tailwind-merge`. */
    className?: string;
    color?: 'default' | 'primary-100';
    size?: 'default' | 'large';
  }
>;

const defaultButton =
  createDefaultRenderWithRef<Overwrite<SharedDefaultProps, InjectedProps>>(
    'button',
  );
const Button = <T extends RenderProp<InjectedProps> | undefined>({
  render = defaultButton,
  size = 'default',
  color = 'default',
  className,
  ...props
}: T extends undefined
  ? Overwrite<SharedDefaultProps, PermanentProps & { render?: T }>
  : PermanentProps) => {
  let sizeTw: string;
  switch (size) {
    case 'default':
      sizeTw = 'py-2';
      break;
    case 'large':
      sizeTw = 'py-3';
      break;
  }

  let colorTw: string;
  switch (color) {
    case 'default':
      colorTw = 'bg-primary-200 dark:bg-primary-200-dark';
      break;
    case 'primary-100':
      colorTw = 'bg-primary-100 dark:bg-primary-100-dark';
      break;
  }

  const classTw = twMerge(
    'rounded px-8 text-base text-white',
    sizeTw,
    colorTw,
    className,
  );

  return render({
    className: classTw,
    // If `render` is undefined, this will most likely be ComponentPropsWithRef<T>
    // if we do have a custom render function, this will probably just be `children`.
    // note that we should remove anything else that isn't part of InjectedProps like `color` or `size`.
    ...props,
  });
};

export default Button;
