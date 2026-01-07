import { Outlet } from "react-router";
import { useDevices } from "./hooks";
import { FiltersProvider } from "./hooks/providers/FiltersProvider";

export function DeviceRoutesWithProviders() {
	const { devices } = useDevices();

	return (
		<FiltersProvider
			items={devices}
			config={{
				getSearchableText: (device) => [device.product.name],
				getCategoryId: (device) => device.line.id,
				getCategoryName: (device) => device.line.name,
			}}
		>
			<Outlet />
		</FiltersProvider>
	);
}
