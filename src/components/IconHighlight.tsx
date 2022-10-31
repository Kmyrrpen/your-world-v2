import { PolymorphicFC } from '@/utils';
import { twMerge } from 'tailwind-merge';

const Icon: PolymorphicFC<'button'> = ({
  as,
  children,
  className,
  ...props
}) => {
  const Component = as || 'button';
  return (
    <Component
      className={twMerge(
        'inline-flex w-10 items-center rounded-lg p-2 text-sm text-black hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-white dark:hover:bg-dark-300 dark:focus:ring-zinc-600 ',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Icon;
