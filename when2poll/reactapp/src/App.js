import logo from './logo.svg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NewPollPage from './pages/NewPollPage';
import InvitesPage from './pages/InvitesPage';
import GroupsPage from './pages/GroupsPage';
import PrivateRoute, { UnAuthRoute } from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import './App.css';


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
      }
    ]
  }
])


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:
//       <Header />,
//     children: [
//       {
//         path: "/",
//         element:
//         <PrivateRoute> 
//           < HomePage />
//         </PrivateRoute>
//       },
//       {
//         path: "/newpoll",
//         element: 
//         <PrivateRoute> 
//           < NewPollPage />
//         </PrivateRoute>
//       },
//       {
//         path: "/invites",
//         element: 
//         <PrivateRoute> 
//           < InvitesPage />
//         </PrivateRoute>
//       },
//       {
//         path: "/groups",
//         element: 
//         <PrivateRoute> 
//           < GroupsPage />
//         </PrivateRoute>
//       }
//     ]
//   },
//   {
//     path: "/login",
//     element:
//     <UnAuthRoute> 
//       < LoginPage />
//     </UnAuthRoute>
// },
//   {
//     path: "/register",
//     element: 
//     <UnAuthRoute> 
//       < RegisterPage />
//     </UnAuthRoute>
//   },
// ]);

function App() {
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
