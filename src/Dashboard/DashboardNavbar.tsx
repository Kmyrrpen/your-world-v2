import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import SettingsModal from "./SettingsModal";

export const worldSettingsKey = "world-settings";

const DashboardNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const worldSettingsParam = searchParams.get(worldSettingsKey);

  return (
    <Navbar>
      <Button onClick={() => setSearchParams("world-settings=true")}>
        settings
      </Button>
      {worldSettingsParam === "true" ? (
        <SettingsModal onClose={() => setSearchParams("", { replace: true })} />
      ) : null}
      <Button as={Link} to={"new"}>
        create note
      </Button>
    </Navbar>
  );
};

export default DashboardNavbar;
