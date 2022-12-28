import { useState } from "react";
import { Link } from "react-router-dom";

import { useMetaStore } from "@/app/metas";
import Container from "@/components/Container";
import CreateModal from "./CreateModal";

const Home: React.FC = () => {
  const metas = useMetaStore((state) => Object.values(state.metas));
  const [openForm, setOpenForm] = useState(false);

  return (
    <Container>
      <button onClick={() => setOpenForm(true)}>Create World</button>
      {openForm ? <CreateModal onClose={() => setOpenForm(false)} /> : null}
      <ul>
        {metas.map((meta) => (
          <li key={meta.id}>
            <Link to={meta.id}>{meta.name}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Home;
