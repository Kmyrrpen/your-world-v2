import classNames from 'classnames';

type Props = { isActive?: boolean } & React.ComponentPropsWithoutRef<'button'>;

const ToolbarIcon: React.FC<Props> = ({
  isActive,
  children,
  className,
  ...props
}) => (
  <button
    className={classNames(
      'flex h-auto w-6 items-center justify-center p-1 md:w-7',
      { 'bg-black text-white dark:bg-dark-300': isActive },
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default ToolbarIcon;
