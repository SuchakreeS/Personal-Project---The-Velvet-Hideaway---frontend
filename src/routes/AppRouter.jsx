import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

const router = createBrowserRouter([
    {path: '/', Component: Landing},
    {path:'/auth/login', Component: Login},
    {path:'/auth/register', Component: Register},
    {path: '*', element: <Navigate to='/' />}
])

function AppRouter() {
    return (
        <RouterProvider router={router}/>
    )
}

export default AppRouter