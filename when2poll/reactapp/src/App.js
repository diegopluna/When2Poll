import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PollPage from './pages/PollPage';
import NewPollPage from './pages/NewPollPage';
import InvitesPage from './pages/InvitesPage';
import GroupsPage from './pages/GroupsPage';
import PrivateRoute, { UnAuthRoute } from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import './App.css';
import "./calendar.css";
import NewGroupPage from './pages/NewGroupPage';
import GroupPage from './pages/GroupPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
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
            path: "poll/:pollId",
            element:
            <PrivateRoute>
              <PollPage />
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
          },
          {
            path: "/group/:groupId",
            element:
            <PrivateRoute>
              <GroupPage />
            </PrivateRoute>
          },
          {
            path: "/newgroup",
            element:
            <PrivateRoute>
              <NewGroupPage />
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
    ]
  }
])


function App() {
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
