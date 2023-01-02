import Container from "@/components/Container";
import { NavLink, Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import DashboardNavbar from "./DashboardNavbar";

const Dashboard: React.FC = () => {
  const bodyRect = document.body.getBoundingClientRect();
  const scrollbarWidth = bodyRect.width - document.body.clientWidth;

  console.log(scrollbarWidth);

  return (
    <Container>
      <DashboardNavbar />
      <div className="mb-4">
        <NavLink
          end
          replace
          to=""
          className={({ isActive }) =>
            twMerge("px-4 py-2", isActive ? "border-b-2 border-black" : "")
          }
        >
          Notes
        </NavLink>
        <NavLink
          end
          replace
          to="tags"
          className={({ isActive }) =>
            twMerge("px-4 py-2", isActive ? "border-b-2 border-black" : "")
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
