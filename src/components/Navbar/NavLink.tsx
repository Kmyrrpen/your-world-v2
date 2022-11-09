import { createDefaultRenderWithRef } from '@/utils';
import {
  ComponentPropsWithInnerRef,
  Overwrite,
  PropsWithRender,
  RenderProp,
} from '@/utils/types';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type SharedDefaultProps = ComponentPropsWithInnerRef<typeof Link>;
type InjectedProps = PropsWithChildren<{ className: string; to: string }>;
type PermanentProps = PropsWithRender<
  InjectedProps,
  {
    /** classes to override default classes with `tailwind-merge`. */
    className?: string;
  }
>;

const defaultNavLink =
  createDefaultRenderWithRef<Overwrite<SharedDefaultProps, InjectedProps>>(
    Link,
  );
const NavLink = <T extends RenderProp<InjectedProps> | undefined>({
  render = defaultNavLink,
  className,
  ...props
}: T extends undefined
  ? Overwrite<SharedDefaultProps, PermanentProps & { render?: T }>
  : Overwrite<PermanentProps, { render: RenderProp<InjectedProps> }>) => {
  return render({
    className: twMerge(
      'md:text-md block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-dark-300 md:p-0 md:hover:bg-transparent md:hover:dark:bg-transparent ',
      className,
    ),
    // `to` is required if this component is used as a `Link`. If it is a Link, `props.to`
    // will for sure be there but typescript doesn't know that, hence this weird monkey-patch
    ...(props as typeof props & { to: string }),
  });
};

export default NavLink;
