import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const FormFieldLabel: React.FC<WithComponentProps<'label'>> = ({
  innerRef,
  className,
  ...props
}) => (
  <label
    ref={innerRef}
    className={twMerge('text-sm text-neutral-600', className)}
    {...props}
  />
);

export default FormFieldLabel;
