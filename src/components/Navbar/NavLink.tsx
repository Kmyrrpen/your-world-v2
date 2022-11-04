import { PolymorphicFunctionComponent } from '@/utils/types';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const NavLink: PolymorphicFunctionComponent<typeof Link> = ({
  as,
  className,
  children,
  ...props
}) => {
  const Component = as || Link;
  return (
    <Component
      className={twMerge(
        'md:text-md block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-dark-300 md:p-0 md:hover:bg-transparent md:hover:dark:bg-transparent ',
        className,
      )}
      // `to` is required if this component is used as a Link. If it is a Link, `props.to`
      // will for sure be there but typescript doesn't know that, hence this weird monkey-patch
      {...(props as typeof props & { to: string })}
    >
      {children}
    </Component>
  );
};

export default NavLink;
