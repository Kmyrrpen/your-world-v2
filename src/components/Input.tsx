import { WithComponentProps } from '@/utils/types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  size?: 'default' | 'large';
};

const Input: React.FC<WithComponentProps<'input', Props>> = ({
  className,
  size = 'default',
  ...props
}) => {
  let sizeTw: string;
  switch (size) {
    case 'default':
      sizeTw = 'p-0.5';
      break;
    case 'large':
      sizeTw = 'p-2';
      break;
  }

  return (
    <input
      className={twMerge(
        'block w-full border-b-[1px] border-b-zinc-200 bg-transparent p-2 outline-none focus:border-b-zinc-800 dark:text-white',
        sizeTw,
        className,
      )}
      {...props}
    />
  );
};

export default Input;
