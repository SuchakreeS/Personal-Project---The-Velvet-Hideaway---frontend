import UserLayout from "@/components/UserLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UserPage from "@/pages/userpage";
import useUserStore from "@/stores/userStore";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

const router = createBrowserRouter([
    { path: '/', Component: Landing },
    { path: '/auth/login', Component: Login },
    { path: '/auth/register', Component: Register },
    { path: '*', element: <Navigate to='/' /> },
    {
        path: '/user', element: <UserLayout />,
        children: [{
            path: '', element: <UserPage />
        }]
    }
])

function AppRouter() {
    const user = useUserStore(state => state.user)
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter