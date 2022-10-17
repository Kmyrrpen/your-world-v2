import { Route, Routes } from "react-router-dom";
import useEnableChangeRoute from "./hooks/useEnableChangeRoute";

import Dashboard from "./dashboard/Dashboard";
import World from "./dashboard/World";
import Editor from "./editor/Editor";
import Home from "./home/Home";
import Tagpage from "./tagview/Tagpage";
import Tagview from "./tagview/Tagview";

function App() {
  useEnableChangeRoute();

  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:worldId" element={<World />}>
          <Route index element={<Dashboard />} />
          <Route path="new" element={<Editor />} />
          <Route path=":id" element={<Editor />} />
          <Route path="tags" element={<Tagview />} />
          <Route path="tags/:id" element={<Tagpage />} />
          <Route />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
