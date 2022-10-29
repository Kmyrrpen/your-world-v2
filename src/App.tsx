import { Route, Routes } from 'react-router-dom';

import useEnableChangeRoute from './hooks/useEnableChangeRoute';
import useEnableTheme from './hooks/useEnableTheme';

import Dashboard from './dashboard/Dashboard';
import Editor from './editor/Editor';
import Home from './home/Home';
import Tagpage from './tags/TagPage';
import Tagview from './tags/TagsPage';
import World from './preps/World';
import Metas from './preps/Metas';

function App() {
  useEnableChangeRoute();
  useEnableTheme();

  return (
    <div className="flex h-full w-full flex-col items-center dark:bg-dark-100 dark:text-white">
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
