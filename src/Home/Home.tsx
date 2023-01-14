import { Link } from "react-router-dom";
import shallow from "zustand/shallow";
import { twJoin } from "tailwind-merge";

import Container from "@/components/Container";
import { useMetaStore } from "@/app/metas";
import { formatDate } from "@/utils";
import SearchEmptyMessage from "@/components/SearchEmptyMessage";
import HomeNavbar from "./HomeNavbar";

const Home: React.FC = () => {
  const metas = useMetaStore(
    (state) =>
      Object.values(state.metas).sort(
        (a, b) => b.recentDateOpened.getTime() - a.recentDateOpened.getTime(),
      ),
    shallow,
  );

  return (
    <Container>
      <HomeNavbar />
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
