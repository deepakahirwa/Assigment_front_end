
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { AdminProfileLoader } from './loaders.js';
import App from './App.js'
import AuthLayout from './components/AuthLayout.jsx';
const ErrorPage = lazy(() => import('./components/pages/ErrorPage.jsx'));

const AdminDashboardPage = lazy(() => import('./components/pages/adminPage.jsx'))
const EmployeelistPage = lazy(() => import('./components/pages/EmployeeList.jsx'))
const DashboardPage = lazy(() => import('./components/pages/Dashboard.jsx'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        element: <Suspense fallback={<LoadingSpinner />}><App /></Suspense>,
        errorElement: <Suspense fallback={<LoadingSpinner />}><ErrorPage /></Suspense>,
        children: [

        ],

    },
    {
        path:'/admin',
        loader:AdminProfileLoader,
        element: <Suspense fallback={<LoadingSpinner />}><AuthLayout><AdminDashboardPage /></AuthLayout></Suspense>,
        children:[
            {
                path:'EmployeeList',
                element: <AuthLayout><EmployeelistPage /></AuthLayout>
            },
            {
                path:'',
                index:true,
                element: <AuthLayout><DashboardPage /></AuthLayout>
            }
        ]
    }

]);

export default router;

