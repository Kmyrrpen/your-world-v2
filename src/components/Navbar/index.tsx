import NavbarComponent from './Navbar';
import NavThemeToggle from './NavThemeToggle';
import NavToggle from './NavToggle';
import NavLogo from './NavLogo';
import NavMenu from './NavMenu';
import NavLink from './NavLink';
import NavBackButton from './NavBackButton';

const Navbar = Object.assign(NavbarComponent, {
  ThemeToggle: NavThemeToggle,
  Toggle: NavToggle,
  Logo: NavLogo,
  Menu: NavMenu,
  Link: NavLink,
  BackButton: NavBackButton,
});

export default Navbar;