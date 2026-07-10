import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Analytics from './pages/Analytics';
import Jobs from './pages/Jobs';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/applications',
    element: <Applications />,
  },
  {
    path: '/analytics',
    element: <Analytics />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
