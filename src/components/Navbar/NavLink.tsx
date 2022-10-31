import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { PolymorphicFC } from '@/utils';

const NavLink: PolymorphicFC<typeof Link> = ({
  as,
  className,
  children,
  ...props
}) => {
  const Component = as || Link;

  // "to" is required if you want to use a Link. If it is a Link `props.to` will for sure be there
  // but typescript doesn't know that, hence this weird monkey-patch
  const _props: typeof props & { to: string } = { ...props, to: props.to };

  return (
    <Component
      className={twMerge(
        'md:text-md block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-dark-300 md:p-0 md:hover:bg-transparent md:hover:dark:bg-transparent ',
        className,
      )}
      {..._props}
    >
      {children}
    </Component>
  );
};

export default NavLink;
