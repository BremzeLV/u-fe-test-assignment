import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDevicesDomain } from "../useDeviceFunctionality";
import { fetchDevices } from "../../services/api/device/deviceApi";

const DevicesContext = createContext<ReturnType<
	typeof useDevicesDomain
> | null>(null);

export function DevicesProvider({ children }: { children: ReactNode }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["devices"],
		queryFn: fetchDevices,
	});

	const devices = useDevicesDomain(data?.devices ?? []);

	if (error) {
		return <div>Error loading devices: {error.message}</div>;
	}

	if (isLoading) {
		return <div>Loading devices...</div>;
	}

	return (
		<DevicesContext.Provider value={devices}>
			{children}
		</DevicesContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDevices() {
	const context = useContext(DevicesContext);
	if (!context) {
		throw new Error("useDevices must be used within an DevicesProvider");
	}
	return context;
}
