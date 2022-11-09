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
    /** manually control active classes */
    isActive?: boolean;
  }
>;

const defaultIcon =
  createDefaultRenderWithRef<Overwrite<SharedDefaultProps, InjectedProps>>(
    'button',
  );

const Icon = <T extends RenderProp<InjectedProps> | undefined>({
  className,
  isActive,
  render = defaultIcon,
  ...props
}: T extends undefined
  ? Overwrite<SharedDefaultProps, PermanentProps & { render?: T }>
  : PermanentProps) => {
  const classTw = twMerge(
    'inline-flex w-10 items-center rounded-lg p-2 text-sm text-black hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-white dark:hover:bg-dark-300 dark:focus:ring-zinc-600',
    isActive && 'ring-2 ring-zinc-200 dark:ring-zinc-600',
    className,
  );

  return render({
    className: classTw,
    ...props,
  });
};

export default Icon;
