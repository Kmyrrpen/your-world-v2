import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { ReactComponent as Click } from '@/assets/click.svg';
import { ReactComponent as ArrowRight } from '@/assets/arrow-right.svg';

import { createDefaultRenderWithRef } from '@/utils';
import {
  ComponentPropsWithInnerRef,
  Overwrite,
  PropsWithRender,
  RenderProp,
} from '@/utils/types';

type InjectedProps = PropsWithChildren<{
  className: string;
}>;

type SharedDefaultProps = ComponentPropsWithInnerRef<'button'>;
type PermanentProps = PropsWithRender<
  InjectedProps,
  {
    size?: 'small' | 'large';
    icon?: 'none' | 'click' | 'arr-right';
    border?: 'dashed' | 'none';
  }
>;

const defaultButton =
  createDefaultRenderWithRef<Overwrite<SharedDefaultProps, InjectedProps>>(
    'button',
  );

const Button = <T extends RenderProp<InjectedProps> | undefined>({
  render = defaultButton,
  size = 'small',
  icon = 'none',
  border = 'dashed',
  className,
  children,
  ...props
}: T extends undefined
  ? Overwrite<SharedDefaultProps, PermanentProps & { render?: T }>
  : PermanentProps) => {
  let sizeTw;
  switch (size) {
    case 'large':
      sizeTw = '';
      break;
    default:
      sizeTw = '';
  }

  let borderTw;
  switch (border) {
    case 'dashed':
      borderTw = 'border-b border-dashed';
      break;
    default:
      borderTw = 'border-none';
  }

  let newChildren;
  switch (icon) {
    case 'click':
      newChildren = (
        <>
          {children}
          <Click className="w-8" />
        </>
      );
      break;
    case 'arr-right':
      newChildren = (
        <>
          {children}
          <ArrowRight className="w-5" />
        </>
      );
      break;
    default:
      newChildren = children;
  }

  return render({
    className: twMerge(
      'flex items-center gap-3 font-bold p-0.5 pr-2',
      borderTw,
      sizeTw,
      className,
    ),
    children: newChildren,
    ...props,
  });
};

export default Button;
