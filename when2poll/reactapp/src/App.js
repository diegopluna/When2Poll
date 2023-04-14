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
import PrivateRoute from './utils/PrivateRoute';
import { UnAuthRoute } from './utils/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element:
        <PrivateRoute> 
          <HomePage />
        </PrivateRoute>
      },
      {
        path: "/newpoll",
        element: 
        <PrivateRoute>
          <NewPollPage />
        </PrivateRoute>
      },
      {
        path: "/invites",
        element: 
        <PrivateRoute>
          <InvitesPage />
        </PrivateRoute>
      },
      {
        path: "/groups",
        element: 
        <PrivateRoute>
          <GroupsPage />
        </PrivateRoute>
      }
    ]
  },
  {
    path: "/login",
    element:
    <UnAuthRoute>
      <LoginPage />
    </UnAuthRoute> 
  },
  {
    path: "/register",
    element: 
    <UnAuthRoute>
      <RegisterPage />
    </UnAuthRoute>
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
