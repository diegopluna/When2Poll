import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Header from "./components/Header.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PrivateRoute, {UnAuthRoute} from "./utils/PrivateRoute.jsx";
import NewPollPage from "./pages/NewPollPage.jsx";
import InvitesPage from "./pages/InvitesPage.jsx";
import GroupsPage from "./pages/GroupsPage.jsx";
import GroupPage from "./pages/GroupPage.jsx";
import NewGroupPage from "./pages/NewGroupPage.jsx";
import './calendar.css'
import PollPage from "./pages/PollPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element: <AuthProvider />,
        children: [
            {
                path:"/signin",
                element:
                <UnAuthRoute>
                    <SignInPage/>
                </UnAuthRoute>
            },
            {
                path:"/signup",
                element:
                <UnAuthRoute>
                    <SignUpPage/>
                </UnAuthRoute>
            },
            {
                path:"/",
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
                        path: "/poll/:pollId",
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
                    },
                    {
                        path: "/friends",
                        element:
                        <PrivateRoute>
                            <FriendsPage />
                        </PrivateRoute>
                    }
                ]
            }
        ]
    },
])

function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App
