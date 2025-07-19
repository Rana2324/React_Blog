import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import BlogPage from '../Pages/BlogsPage';
import BookmarkPage from '../Pages/BookmarkPage';
import Home from '../Pages/Home';
import BlogDetailsPage from '../Pages/BlogDetailsPage';
import Content from '../Components/Content';
import Author from '../Components/Author';

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
                path:'blog/:id',
                element:<BlogDetailsPage />,
                children: [
                    {
                        index: true,
                        element: <Content />
                    },
                    {
                        path: 'author',
                        element: <Author />,
                        loader: ({ params }) => {
                          return fetch(`https://dev.to/api/articles/${params?.id}`)
                        },
                    }
                ]
                    
            },
            {
                path: '/bookmark',
                element: <BookmarkPage />
            },
        ]
 }  

])

export default router;