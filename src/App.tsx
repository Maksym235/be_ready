import "./App.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
const HomePage = lazy(() => import("./Pages/Home/Home"));
// =========Router==========================
const router = createBrowserRouter([
	{
		Component: () => <Layout />,
		children: [{ index: true, Component: () => <HomePage /> }],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
