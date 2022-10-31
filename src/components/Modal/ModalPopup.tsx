import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  size?: 'small' | 'medium' | 'large' | 'responsive';
} & ComponentPropsWithoutRef<'div'>;

const ModalPopup: React.FC<Props> = ({
  size = 'responsive',
  children,
  className,
  ...props
}) => {
  let sizeTw: string;
  switch (size) {
    case 'small':
      sizeTw = 'max-w-xs';
      break;
    case 'medium':
      sizeTw = 'max-w-md';
      break;
    case 'large':
      sizeTw = 'max-w-2xl';
      break;
    case 'responsive':
      sizeTw = 'max-w-md lg:max-w-xl';
  }

  return (
    <div
      className={twMerge(
        'relative z-20 flex min-h-[10rem] w-full flex-col rounded bg-white',
        sizeTw,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModalPopup;
