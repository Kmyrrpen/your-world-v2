import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

type Props = {
  size?: 'small' | 'medium' | 'large' | 'responsive';
};

const ModalContainer: React.FC<WithComponentProps<'div', Props>> = ({
  size = 'responsive',
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
      className={twMerge(
        'dark:bg-dark-100 p-4 relative z-20 flex min-h-[10rem] w-full flex-col justify-start rounded bg-white',
        sizeTw,
        className,
      )}
      ref={innerRef}
      {...props}
    />
  );
};

export default ModalContainer;
