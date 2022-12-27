import { Route, Routes } from 'react-router-dom';
import useEnableTheme from './hooks/useEnableTheme';

import Home from './home/Home';
import Editor from './editor/Editor';
import World from './loading/World';
import Metas from './loading/Metas';

import Dashboard from './_update/dashboard/Dashboard';
import Notes from './_update/dashboard/Notes';
import Tags from './_update/dashboard/Tags';
import Tag from './_update/dashboard/Tags/Tag';

function App() {
  useEnableTheme();

  return (
    <div className="line flex flex-col items-center text-base">
      <Routes>
        <Route path="/" element={<Metas />}>
          <Route index element={<Home />} />
          <Route path="/:worldId" element={<World />}>
            <Route path="" element={<Dashboard />}>
              <Route index element={<Notes />} />
              <Route path="tags" element={<Tags />} />
              <Route path="tags/:id" element={<Tag />} />
            </Route>
            <Route path=":id" element={<Editor />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
