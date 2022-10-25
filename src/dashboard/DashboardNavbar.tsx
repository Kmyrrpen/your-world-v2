import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useWorld } from '@/app/world/hooks';

import NavContainer from '@/components/Navbar/NavContainer';
import NavLink from '@/components/Navbar/NavLink';
import NavLogo from '@/components/Navbar/NavLogo';
import NavMenu from '@/components/Navbar/NavMenu';
import NavThemeToggle from '@/components/Navbar/NavThemeToggle';
import NavToggle from '@/components/Navbar/NavToggle';
import Button from '@/components/Button';

const DashboardNavbar: React.FC = () => {
  const world = useWorld();
  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle((prev) => !prev);

  return (
    <NavContainer>
      <NavLogo />
      <NavThemeToggle />
      <NavToggle onClick={onToggle} />
      <NavMenu toggle={toggle}>
        <li>
          <NavLink to={`/${world.id}`}>dashboard</NavLink>
        </li>
        <li>
          <NavLink to={`/${world.id}/tags`}>see tags</NavLink>
        </li>
        <li className="md:hidden">
          <NavLink to={`/${world.id}/new`}>create new</NavLink>
        </li>
        <li>
          <Button
            as={Link}
            className="hidden md:inline-block"
            to={`/${world.id}/new`}
          >
            New Note
          </Button>
        </li>
      </NavMenu>
    </NavContainer>
  );
};

export default DashboardNavbar;
