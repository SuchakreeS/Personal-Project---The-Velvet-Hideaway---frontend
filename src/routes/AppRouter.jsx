import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Landing from '@/pages/Landing'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Explore from '@/pages/Explore'
import UserLayout from '@/components/UserLayout'
import Profile from '@/pages/Profile'
import UserRecipe from '@/pages/UserRecipe'
import MusicPlayer from '@/pages/MusicPlayer'
import BaseSpirit from '@/pages/BaseSpirit'
import About from '@/pages/About'
import Category from '@/pages/Category'
import { ProtectRoute } from '@/components/ProtectRoute'

export default function AppRouter() {
    const router = createBrowserRouter([
        { path: "/", element: <Landing /> },
        { path: "/auth/login", element: <Login /> },
        { path: "/auth/register", element: <Register /> },
        {
            path: '/',
            element: <UserLayout />,
            children: [
                { path: '/recipes', element: <Explore /> },
                { path: '/barfront', element: <MusicPlayer /> },
                { path: '/spirits', element: <BaseSpirit /> },
                {path: '/about', element:<About />},
                
                // PROTECTED: Any logged-in user
                { 
                    path: '/user', 
                    element: <ProtectRoute><Profile /></ProtectRoute> 
                },
                { 
                    path: '/recipes/user-recipes', 
                    element: <ProtectRoute><UserRecipe /></ProtectRoute> 
                },

                // PROTECTED: Admin Only
                { 
                    path: '/categories', 
                    element: (
                        <ProtectRoute allowRoles={['ADMIN']}>
                            <Category />
                        </ProtectRoute>
                    ) 
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}