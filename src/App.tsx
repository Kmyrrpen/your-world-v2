import { Route, Routes } from "react-router-dom";
import { MetasProvider } from "./app/metas";
import { WorldProvider } from "./app/world";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MetasProvider />}>
        <Route path="/:world" element={<WorldProvider />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
