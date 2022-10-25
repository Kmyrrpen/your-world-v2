import classNames from 'classnames';

type Props = React.ComponentPropsWithoutRef<'input'>;

const Input: React.FC<Props> = ({ className, ...props }) => (
  <input
    className={classNames(
      'block w-full border-b-2 border-b-gray-200 p-2 dark:text-white bg-transparent',
      className,
    )}
    {...props}
  />
);

export default Input;
