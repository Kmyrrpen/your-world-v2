import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames';

import useEnableChangeRoute from './hooks/useEnableChangeRoute';
import useTheme from './app/theme/hooks';

import Dashboard from './dashboard/Dashboard';
import World from './dashboard/World';
import Editor from './editor/Editor';
import Home from './home/Home';
import Tagpage from './tagview/TagPage';
import Tagview from './tagview/TagsPage';
import { useEffect } from 'react';

function App() {
  useEnableChangeRoute();
  const theme = useTheme();

  useEffect(() => {
    const body = document.body;
    theme === 'dark'
      ? body.classList.add('dark')
      : body.classList.remove('dark');
  }, [theme]);

  return (
    <div
      className={classNames(theme, 'flex h-full w-full flex-col items-center dark:bg-dark dark:text-white')}
    >
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
