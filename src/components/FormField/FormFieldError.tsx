import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

type Props = {
  message?: string;
};

const FormFieldError: React.FC<WithComponentProps<'span', Props>> = ({
  innerRef,
  className,
  message,
  ...props
}) => {
  return (
    <span
      className={twMerge('text-sm text-form-error', className)}
      ref={innerRef}
      {...props}
    >
      {message}
    </span>
  );
};

export default FormFieldError;
