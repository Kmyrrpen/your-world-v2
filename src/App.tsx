import { Route, Routes } from 'react-router-dom';

import useEnableChangeRoute from './hooks/useEnableChangeRoute';
import useEnableTheme from './hooks/useEnableTheme';

import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import Editor from './editor/Editor';
import Tagpage from './tags/TagPage';
import Tagview from './tags/TagsPage';
import World from './loads/World';
import Metas from './loads/Metas';

function App() {
  useEnableChangeRoute();
  useEnableTheme();

  return (
    <div className="line flex flex-col items-center text-base">
      <Routes>
        <Route path="/" element={<Metas />}>
          <Route index element={<Home />} />
          <Route path="/:worldId" element={<World />}>
            <Route index element={<Dashboard />} />
            <Route path=":id" element={<Editor />} />
            <Route path="tags" element={<Tagview />} />
            <Route path="tags/:id" element={<Tagpage />} />
            <Route />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
