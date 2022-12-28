import { Route, Routes } from "react-router-dom";
import { MetasProvider } from "./app/metas";
import { WorldProvider } from "./app/world";
import Home from "./Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MetasProvider />}>
        <Route index element={<Home />} />
        <Route path="/:world" element={<WorldProvider />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
