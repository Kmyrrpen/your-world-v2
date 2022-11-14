import { createDefaultRenderWithRef } from '@/utils';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ComponentPropsWithInnerRef,
  Overwrite,
  PropsWithRender,
  RenderProp,
} from '@/utils/types';

type InjectedProps = PropsWithChildren<{ className: string }>;
type SharedDefaultProps = ComponentPropsWithInnerRef<'button'>;

type PermanentProps = PropsWithRender<
  InjectedProps,
  {
    /** classes to override default classes with `tailwind-merge`. */
    className?: string;
  }
>;

const defaultIcon =
  createDefaultRenderWithRef<Overwrite<SharedDefaultProps, InjectedProps>>(
    'button',
  );

const IconButton = <T extends RenderProp<InjectedProps> | undefined>({
  render = defaultIcon,
  className,
  ...props
}: T extends undefined
  ? Overwrite<SharedDefaultProps, PermanentProps & { render?: T }>
  : PermanentProps) => {
  const classTw = twMerge(
    'inline-flex justify-center items-center text-sm text-black hover:text-neutral-500 dark:text-white gap-2',
    className,
  );

  return render({
    className: classTw,
    ...props,
  });
};

export default IconButton;
