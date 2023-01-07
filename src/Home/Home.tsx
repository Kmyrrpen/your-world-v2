import { useState } from "react";
import { Link } from "react-router-dom";
import shallow from "zustand/shallow";

import { useMetaStore } from "@/app/metas";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";

import { formatDate } from "@/utils";
import CreateModal from "./CreateModal";
import Button from "@/components/Button";
import { twJoin } from "tailwind-merge";
import SearchEmptyMessage from "@/components/SearchEmptyMessage";

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
      <ul className={twJoin("flex flex-col gap-3", !metas.length && "hidden")}>
        {metas.map((meta) => (
          <li key={meta.id}>
            <Link
              className="flex flex-col border border-gray-600 p-2"
              to={meta.id}
            >
              <h2 className="mb-2 text-lg font-bold">{meta.name}</h2>
              <span className="font-sans text-sm font-medium text-gray-400">
                recent: {formatDate(meta.recentDateOpened)}
              </span>
              <span className="font-sans text-sm font-medium text-gray-400">
                created: {formatDate(meta.dateCreated)}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <SearchEmptyMessage inputValue="" isHidden={Boolean(metas.length)}>
        Go Ahead and create your first world! It will show up here.
      </SearchEmptyMessage>
    </Container>
  );
};

export default Home;
