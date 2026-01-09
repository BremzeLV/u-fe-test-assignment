import { Outlet } from "react-router";
import { useDevices } from "../../hooks";
import { FiltersProvider } from "../../hooks/providers/FiltersProvider";
import type { Device } from "../../services/api/device/deviceSchema";

const filterConfig = {
	getSearchableText: (device: Device) => [device.product.name],
	getCategoryId: (device: Device) => device.line.id,
	getCategoryName: (device: Device) => device.line.name,
};

export function DeviceRoutesWithProviders() {
	const { devices } = useDevices();

	return (
		<FiltersProvider items={devices} config={filterConfig}>
			<Outlet />
		</FiltersProvider>
	);
}
