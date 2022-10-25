import { useState } from 'react';

import NavContainer from '@/components/Navbar/NavContainer';
import NavLink from '@/components/Navbar/NavLink';
import NavLogo from '@/components/Navbar/NavLogo';
import NavMenu from '@/components/Navbar/NavMenu';
import NavThemeToggle from '@/components/Navbar/NavThemeToggle';
import NavToggle from '@/components/Navbar/NavToggle';

const HomeNavbar: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle((prev) => !prev);

  return (
    <NavContainer>
      <NavLogo hasText />
      <NavThemeToggle />
      <NavToggle onClick={onToggle} />
      <NavMenu toggle={toggle}>
        <li>
          <NavLink to="/how-to-use">instructions</NavLink>
        </li>
        <li>
          <NavLink to="/contact">contact</NavLink>
        </li>
      </NavMenu>
    </NavContainer>
  );
};

export default HomeNavbar;
