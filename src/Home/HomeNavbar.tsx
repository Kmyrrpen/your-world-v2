import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import CreateModal from "./CreateModal";

import { ReactComponent as Logo } from "@/assets/logo.svg";
import { ReactComponent as GithubIcon } from "@/assets/github.svg";

const HomeNavbar: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Navbar>
      <div className="w-10">
        <Logo className="w-full" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <a
          href="https://github.com/nasheomirro/your-world-v2"
          target={"_blank"}
          rel="noreferrer"
          className="w-8"
        >
          <GithubIcon />
        </a>
        <Button onClick={() => setOpenForm(true)}>Create World</Button>
      </div>
      {openForm ? <CreateModal onClose={() => setOpenForm(false)} /> : null}
    </Navbar>
  );
};

export default HomeNavbar;
