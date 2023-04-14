import logo from './logo.svg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NewPollPage from './pages/NewPollPage';
import InvitesPage from './pages/InvitesPage';
import GroupsPage from './pages/GroupsPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/app",
    element: <Header />,
    children: [
      {
        path: "/app/home",
        element: <HomePage />
      },
      {
        path: "/app/newpoll",
        element: <NewPollPage />
      },
      {
        path: "/app/invites",
        element: <InvitesPage />
      },
      {
        path: "/app/groups",
        element: <GroupsPage />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
