import { twMerge } from 'tailwind-merge';
import { ReactComponent as ExitIcon } from '@/assets/close-icon.svg';
import { WithComponentProps } from '@/utils/types';
import Icon from '@/components/Icon';

const ModalCloseIcon: React.FC<WithComponentProps<'button'>> = ({
  className,
  ...props
}) => {
  return (
    <Icon className={twMerge('w-7', className)} {...props}>
      <ExitIcon className="h-auto w-full" />
    </Icon>
  );
};

export default ModalCloseIcon;
