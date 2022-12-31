import { Link, useSearchParams } from "react-router-dom";
import SettingsModal from "./SettingsModal";

const DashboardNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const worldSettingsParam = searchParams.get("world-settings");

  return (
    <nav className="mb-16 flex items-center justify-end">
      <button onClick={() => setSearchParams("world-settings=true")}>
        settings
      </button>
      {worldSettingsParam === "true" ? (
        <SettingsModal onClose={() => setSearchParams("", { replace: true })} />
      ) : null}
      <Link to={"new"}>New Note</Link>
    </nav>
  );
};

export default DashboardNavbar;
