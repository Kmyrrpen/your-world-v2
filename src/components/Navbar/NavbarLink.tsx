import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import {
  ComponentPropsWithInnerRef,
  Overwrite,
  PropsWithRender,
  RenderProp,
} from '@/utils/types';
import { createDefaultRenderWithRef } from '@/utils';

type InjectedProps = PropsWithChildren<{ className: string }>;
type DefaultProps = ComponentPropsWithInnerRef<typeof Link>;
type PermanentProps = PropsWithRender<InjectedProps>;

/**
 * Be sure to pass the correct default props, this is because
 * we skip over type checking the props of Link to make things easier.
 * As long as we have the same default props for our default render we're clear.
 */
const defaultMenuItem = createDefaultRenderWithRef<InjectedProps>(Link);

const NavbarLink = <T extends RenderProp<InjectedProps> | undefined>({
  render = defaultMenuItem,
  className,
  ...props
}: T extends undefined
  ? Overwrite<DefaultProps, PermanentProps & { render?: T }>
  : PermanentProps) => {
  return render({
    className: twMerge('', className),
    ...props,
  });
};

export default NavbarLink;
