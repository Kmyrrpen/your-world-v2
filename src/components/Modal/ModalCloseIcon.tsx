import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ReactComponent as ExitIcon } from '@/assets/close-icon.svg';
import Icon from '@/components/IconHighlight';

const ModalCloseIcon: React.FC<ComponentPropsWithoutRef<'button'>> = ({
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
