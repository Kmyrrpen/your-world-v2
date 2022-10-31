import { twMerge } from 'tailwind-merge';
type Props = { isActive?: boolean } & React.ComponentPropsWithoutRef<'button'>;

const ToolbarIcon: React.FC<Props> = ({
  isActive,
  children,
  className,
  ...props
}) => (
  <button
    className={twMerge(
      'flex h-auto w-6 items-center justify-center p-1 md:w-7',
      isActive && 'bg-black text-white dark:bg-dark-300',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default ToolbarIcon;
