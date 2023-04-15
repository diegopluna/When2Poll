import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NewPollPage from './pages/NewPollPage'
import InvitesPage from './pages/InvitesPage'
import GroupsPage from './pages/GroupsPage'
import Header from './components/Header'
import Protected from './utils/Protected'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";


import App from './App'

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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Header/>,
//     children: [
//       {
//         path: "/",
//         element: <Protected>
//           <HomePage />
//         </Protected>
//       },
//       {
//         path: "/login",
//         element: <LoginPage />
//       }
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
