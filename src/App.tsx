import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route
} from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import PrivateLayout from './layouts/PrivateLayout';
import ProtectedLayout from './layouts/ProtectedLayout';

// Errors
import RootError from './errors/RootError';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Blog, { blogLoader } from './pages/Blog';
import BlogPost, { blogPostLoader } from './pages/BlogPost';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} errorElement={<RootError />}>
                <Route index element={<Home />} />

                <Route element={<ProtectedLayout role="admin" />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route element={<ProtectedLayout role="user" />}>
                    <Route path="/profile" element={<Dashboard />} />
                </Route>

                <Route path="/blog">
                    <Route index element={<Blog />} loader={blogLoader} />
                    <Route
                        path=":slug"
                        element={<BlogPost />}
                        loader={blogPostLoader}
                    />
                </Route>

                <Route path="/login" element={<Login />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
