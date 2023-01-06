import { useState } from "react";
import { Link } from "react-router-dom";
import shallow from "zustand/shallow";

import { useMetaStore } from "@/app/metas";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";

import { formatDate } from "@/utils";
import CreateModal from "./CreateModal";
import Button from "@/components/Button";

const Home: React.FC = () => {
  const metas = useMetaStore(
    (state) =>
      Object.values(state.metas).sort(
        (a, b) => a.dateCreated.getTime() - b.dateCreated.getTime(),
      ),
    shallow,
  );
  const [openForm, setOpenForm] = useState(false);

  return (
    <Container>
      <Navbar>
        <Button onClick={() => setOpenForm(true)}>Create World</Button>
        {openForm ? <CreateModal onClose={() => setOpenForm(false)} /> : null}
      </Navbar>
      <ul className="flex flex-col gap-3">
        {metas.map((meta) => (
          <li key={meta.id}>
            <Link className="flex flex-col border p-2 border-gray-600" to={meta.id}>
              <h2 className="text-lg mb-2 font-bold">{meta.name}</h2>
              <span className="text-sm text-gray-400 font-sans font-medium">recent: {formatDate(meta.recentDateOpened)}</span>
              <span className="text-sm text-gray-400 font-sans font-medium">created: {formatDate(meta.dateCreated)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Home;
