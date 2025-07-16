import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import BlogPage from '../Pages/BlogPage';
import BookmarkPage from '../Pages/BookmarkPage';
import Home from '../Pages/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/blog',
                element: <BlogPage />
            },
            {
                path: '/bookmark',
                element: <BookmarkPage />
            },

        ]
 }  

])

export default router;