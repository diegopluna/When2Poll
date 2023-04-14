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
    element: <Header />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/newpoll",
        element: <NewPollPage />
      },
      {
        path: "/invites",
        element: <InvitesPage />
      },
      {
        path: "/groups",
        element: <GroupsPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
