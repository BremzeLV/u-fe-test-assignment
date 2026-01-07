import { useState } from "react";
import { ViewType } from "../components/types";
import type { Device } from "../services/devices/types";

export function useDevicesDomain(devices: Device[]) {
	const [currentDevicesViewType, setCurrentDevicesViewType] = useState(
		ViewType.Table
	);

	const devicesMap = new Map();
	const devicesIdKeyMap = new Map();
	const deviceLinesMap = new Map();

	devices.forEach((device, index) => {
		devicesMap.set(device.id, device);
		devicesIdKeyMap.set(device.id, index);

		if (!deviceLinesMap.has(device.line.id)) {
			deviceLinesMap.set(device.line.id, device.line.name);
		}
	});

	const getDevice = (id: Device["id"]): Device | null => {
		return devicesMap.get(id) ?? null;
	};

	const getPrevNextDevice = (deviceId: string) => {
		const i = devicesIdKeyMap.get(deviceId);
		if (i === undefined) return { prev: null, next: null };
		return {
			prev: devices[i - 1] ?? null,
			next: devices[i + 1] ?? null,
		};
	};

	const getDeviceImage = (id: Device["id"], size: number): string | null => {
		if (devicesMap.has(id)) {
			const device = devicesMap.get(id);

			return `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${device.id}/default/${device.images.default}.png&w=${size}&q=75`;
		}

		return null;
	};

	const setDevicesViewType = (viewType: ViewType) => {
		setCurrentDevicesViewType(viewType);
	};

	return {
		getDevice,
		getDeviceImage,
		getPrevNextDevice,
		setDevicesViewType,

		devices,
		deviceLinesMap,
		deviceViewType: currentDevicesViewType,
	};
}
