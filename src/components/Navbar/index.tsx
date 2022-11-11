import NavbarC from './Navbar';
import NavbarLogo from './NavbarLogo';
import NavbarMenu from './NavbarMenu';
import NavbarLink from './NavbarLink';
import NavbarMenuItem from './NavbarMenuItem';
import NavbarBack from './NavbarBack';

const Navbar = Object.assign(NavbarC, {
  Logo: NavbarLogo,
  Menu: NavbarMenu,
  MenuItem: NavbarMenuItem,
  Link: NavbarLink,
  Back: NavbarBack,
});

export default Navbar;
