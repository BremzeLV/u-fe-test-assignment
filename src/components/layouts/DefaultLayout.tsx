import { Outlet } from "react-router";
import { Header } from "./Header";

export function DefaultLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
