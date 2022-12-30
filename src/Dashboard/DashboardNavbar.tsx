import { useState } from "react";
import { Link } from "react-router-dom";
import SettingsModal from "./SettingsModal";

const DashboardNavbar = () => {
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <nav className="mb-16 flex items-center justify-end">
      <button onClick={() => setOpenSettings(true)}>settings</button>
      {openSettings ? (
        <SettingsModal onClose={() => setOpenSettings(false)} />
      ) : null}
      <Link to={"new"}>New Note</Link>
    </nav>
  );
};

export default DashboardNavbar;
