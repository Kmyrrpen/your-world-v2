import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import CreateModal from "./CreateModal";

const HomeNavbar: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Navbar className="gap-1 justify-end">
      <Button onClick={() => setOpenForm(true)}>Create World</Button>
      {openForm ? <CreateModal onClose={() => setOpenForm(false)} /> : null}
    </Navbar>
  );
};

export default HomeNavbar;
