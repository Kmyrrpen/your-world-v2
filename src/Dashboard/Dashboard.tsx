import { useMetaStore } from "@/app/metas";
import { useWorldStore } from "@/app/world";
import Container from "@/components/Container";
import { NavLink, Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import shallow from "zustand/shallow";

import DashboardNavbar from "./DashboardNavbar";

const Dashboard: React.FC = () => {
  const id = useWorldStore((state) => state.id);
  const meta = useMetaStore((state) => state.metas[id], shallow);

  return (
    <Container>
      <DashboardNavbar />
      <h1 className="mb-9 text-4xl font-bold">{meta.name}</h1>
      <div className="mb-4">
        <NavLink
          end
          replace
          to=""
          className={({ isActive }) =>
            twMerge(
              "px-4 py-2 font-sans text-sm font-medium transition-colors",
              isActive ? "border-black bg-primary-300" : "",
            )
          }
        >
          Notes
        </NavLink>
        <NavLink
          end
          replace
          to="tags"
          className={({ isActive }) =>
            twMerge(
              "px-4 py-2 font-sans text-sm font-medium transition-colors",
              isActive ? "border-black bg-primary-300" : "",
            )
          }
        >
          Tags
        </NavLink>
      </div>
      <Outlet />
    </Container>
  );
};

export default Dashboard;
