import { useRoutes } from 'react-router-dom';
import { AuthGuard } from './auth/AuthGuard';
import { DownloadsContent } from './components/Content/DownloadsContent/DownloadsContent';
import { HomeContent } from './components/Content/HomeContent/HomeContent';
import { SettingsContent } from './components/Content/SettingsContent/SettingsContent';
import { UsersContent } from './components/Content/UsersContent/UsersContent';
import { Path } from './enums/path';
import { UserRole } from './enums/user';
import { Login } from './pages/Login/Login';
import { Main } from './pages/Main/Main';
import { NotFound } from './pages/NotFound/NotFound';

export const App = () => {
  return useRoutes([
    {
      path: Path.LOGIN,
      element: <Login />,
    },
    {
      path: '',
      element: <AuthGuard />,
      children: [
        {
          path: Path.HOME,
          element: <Main content={<HomeContent />} />,
        },
        {
          path: Path.USERS,
          element: <Main roles={[UserRole.ADMIN]} content={<UsersContent />} />,
        },
        {
          path: Path.SETTINGS,
          element: <Main content={<SettingsContent />} />,
        },
        {
          path: Path.DOWNLOADS,
          element: <Main content={<DownloadsContent />} />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);
};
