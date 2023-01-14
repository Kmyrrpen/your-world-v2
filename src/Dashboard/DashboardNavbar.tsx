import Icons from "@/assets/icons";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Navlink from "@/components/Navlink";
import { Link, useSearchParams } from "react-router-dom";
import SettingsModal from "./SettingsModal";

export const worldSettingsKey = "world-settings";

const DashboardNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const worldSettingsParam = searchParams.get(worldSettingsKey);

  return (
    <Navbar>
      <Navlink to={"/"}>
        <Icons.ArrowLeft />
        <span>Back</span>
      </Navlink>
      <div className="ml-auto flex gap-1">
        <Button onClick={() => setSearchParams("world-settings=true")}>
          settings
        </Button>
        {worldSettingsParam === "true" ? (
          <SettingsModal
            onClose={() => setSearchParams("", { replace: true })}
          />
        ) : null}
        <Button as={Link} to={"new"}>
          create note
        </Button>
      </div>
    </Navbar>
  );
};

export default DashboardNavbar;
