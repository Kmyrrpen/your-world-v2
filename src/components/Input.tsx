import { twMerge } from 'tailwind-merge';

type Props = React.ComponentPropsWithoutRef<'input'>;
const Input: React.FC<Props> = ({ className, ...props }) => (
  <input
    className={twMerge(
      'block w-full border-b-2 border-b-zinc-200 bg-transparent p-2 dark:text-white ',
      className,
    )}
    {...props}
  />
);

export default Input;
