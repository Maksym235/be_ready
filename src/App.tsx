import './App.css';
// import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Components/Layout/Layout';
// const HomePage = lazy(() => import("./Pages/Home/Home"));
import HomePage from './Pages/Home/Home';
import ListsPage from './Pages/Lists/Lists';
import Profile from './Pages/Profile/Profile';
import { SelectedList } from './Components/SelectedList/SelectedList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './auth';
// const ListsPage = lazy(() => import("./Pages/Lists/Lists"));
const queryClient = new QueryClient();
// =========Router==========================
const router = createBrowserRouter([
  {
    Component: () => <Layout />,
    children: [
      { index: true, Component: () => <HomePage /> },
      {
        path: '/lists',
        Component: () => <ListsPage />,
      },
      {
        path: '/selectedList/:id',
        Component: () => <SelectedList />,
      },
      {
        path: '/profile',
        Component: () => <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position='top-center' reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
