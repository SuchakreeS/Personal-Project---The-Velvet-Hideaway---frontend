import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import { useState } from 'react'
import Landing from '@/pages/Landing'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Explore from '@/pages/Explore'
import UserLayout from '@/components/UserLayout'
import Profile from '@/pages/Profile'
import UserRecipe from '@/pages/UserRecipe'
import MusicPlayer from '@/pages/MusicPlayer'

export default function AppRouter() {
    const [isGuest, setIsGuest] = useState(false)

    // Replace with your actual Auth Store logic (e.g., const { user } = useAuthStore())
    const user = null

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Landing onGuest={() => setIsGuest(true)} />
        },
        {
            path: "/auth/login",
            element: <Login />
        },
        {
            path: "/auth/register",
            element: <Register />
        },
        {
            path: '/',
            element: <UserLayout />,
            children: [
                {
                    path: '/recipes',
                    element: <Explore />
                },
                {
                    path: '/recipes/user-recipes',
                    element: <UserRecipe />
                },
                {
                    path: '/user',
                    element: <Profile />
                },
                {
                    path: '/barfront',
                    element: <MusicPlayer />
                }
            ]
        }

    ]);

    return <RouterProvider router={router} />
}