import { polyRef } from '@/utils';
import { Link } from 'react-router-dom';

const NavbarLink = polyRef<typeof Link>(({ as, ...props }, ref) => {
  const Element = as || Link;
  return <Element ref={ref} {...props} />;
});

export default NavbarLink;