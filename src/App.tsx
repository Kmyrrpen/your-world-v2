import { Route, Routes } from "react-router-dom";
import { MetasProvider } from "./app/metas";
import { WorldProvider } from "./app/world";

import Dashboard, { Notes, Tags } from "./Dashboard";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MetasProvider />}>
        <Route index element={<Home />} />
        <Route path="/:world" element={<WorldProvider />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Notes />} />
            <Route path="tags" element={<Tags />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
