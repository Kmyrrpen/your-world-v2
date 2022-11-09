import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

type Props = {
  size?: 'small' | 'medium' | 'large' | 'responsive';
};

const ModalPopup: React.FC<WithComponentProps<'div', Props>> = ({
  size = 'responsive',
  children,
  innerRef,
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
      ref={innerRef}
      className={twMerge(
        'relative z-20 flex min-h-[10rem] w-full flex-col justify-start rounded bg-white dark:bg-dark-100',
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
