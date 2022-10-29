import { useState } from 'react';
import {
  NavContainer,
  NavLink,
  NavLogo,
  NavMenu,
  NavThemeToggle,
  NavToggle,
} from '@/components/Navbar';

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
