import { useRef, useState } from 'react';
import useClickOutside from './useClickOutside';

const useNavbarToggle = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle((prev) => !prev);

  useClickOutside(menuRef, () => {
    setToggle(false);
  });

  return { menuRef, toggle, onToggle };
};

export default useNavbarToggle;
