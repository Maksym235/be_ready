import "./App.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
const HomePage = lazy(() => import("./Pages/Home/Home"));
import ListsPage from "./Pages/Lists/Lists";
import { SelectedList } from "./Components/SelectedList/SelectedList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// const ListsPage = lazy(() => import("./Pages/Lists/Lists"));
const queryClient = new QueryClient();
// =========Router==========================
const router = createBrowserRouter([
	{
		Component: () => <Layout />,
		children: [
			{ index: true, Component: () => <HomePage /> },
			{
				path: "/lists",
				Component: () => <ListsPage />,
			},
			{
				path: "/selectedList/:id",
				Component: () => <SelectedList />,
			},
		],
	},
]);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
