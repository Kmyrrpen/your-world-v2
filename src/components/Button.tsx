import { PolymorphicFC } from '@/utils';
import { twMerge } from 'tailwind-merge';

type Props = {
  color?: 'default' | 'primary-100';
  size?: 'default' | 'large';
};

const Button: PolymorphicFC<'button', Props> = ({
  as,
  children,
  className,
  size = 'default',
  color = 'default',
  ...props
}) => {
  const Component = as || 'button';

  // note the `Tw` postfix is to enable tailwind intellisense.
  let sizeTw: string;
  switch (size) {
    case 'default':
      sizeTw = 'py-2';
      break;
    case 'large':
      sizeTw = 'py-3';
      break;
  }

  let colorTw: string;
  switch (color) {
    case 'default':
      colorTw = 'bg-primary-200 dark:bg-primary-200-dark';
      break;
    case 'primary-100':
      colorTw = 'bg-primary-100 dark:bg-primary-100-dark';
      break;
  }

  return (
    <Component
      className={twMerge(
        'rounded px-8 text-base text-white ',
        sizeTw,
        colorTw,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
