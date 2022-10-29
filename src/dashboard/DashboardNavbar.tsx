import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWorld } from '@/app/world/hooks';
import Button from '@/components/Button';
import {
  NavBackButton,
  NavContainer,
  NavLink,
  NavMenu,
  NavThemeToggle,
  NavToggle,
} from '@/components/Navbar';

const DashboardNavbar: React.FC = () => {
  const world = useWorld();
  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle((prev) => !prev);

  return (
    <NavContainer>
      <NavBackButton />
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
