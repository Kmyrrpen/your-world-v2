import { useWorld } from "@/app/world/hooks";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const world = useWorld();
  return (
    <div>
      <ul>
        <li>
          <Link to={`/${world.id}`}>Dashboard</Link>
        </li>
        <li>
          <Link to={`/${world.id}/new`}>New Note</Link>
        </li>
        <li>
          <Link to={`/${world.id}/tags`}>See Tags</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
