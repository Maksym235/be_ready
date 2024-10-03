import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "../../Pages/Home/api";
export const Layout: FC = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrent,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Something went wrong.</div>;
	}
	return (
		<div>
			<Header user={data.user} />
			<Outlet />
		</div>
	);
};
