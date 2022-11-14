import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { createDefaultRenderWithRef } from '@/utils';
import {
  ComponentPropsWithInnerRef,
  PropsWithRender,
  Overwrite,
  RenderProp,
} from '@/utils/types';

type InjectedProps = PropsWithChildren<{
  className: string;
}>;

type SharedDefaultProps = ComponentPropsWithInnerRef<'button'>;
type PermanentProps = PropsWithRender<InjectedProps, {}>;

const defaultButton =
  createDefaultRenderWithRef<Overwrite<SharedDefaultProps, InjectedProps>>(
    'button',
  );

const Button = <T extends RenderProp<InjectedProps> | undefined>({
  render = defaultButton,
  className,
  ...props
}: T extends undefined
  ? Overwrite<SharedDefaultProps, PermanentProps & { render?: T }>
  : PermanentProps) => {
  return render({
    className: twMerge(
      'flex items-center border-b border-dashed gap-3 font-bold p-0.5 px-1 hover:text-neutral-500',
      className,
    ),
    ...props,
  });
};

export default Button;
