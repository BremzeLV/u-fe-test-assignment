import { useMemo, useState } from "react";
import { ViewType } from "../components/types";
import type { Device } from "../services/api/device/deviceSchema";

export function useDevicesDomain(devices: Device[]) {
	const [currentDevicesViewType, setCurrentDevicesViewType] = useState(
		ViewType.Table
	);

	const { devicesMap, devicesIdKeyMap, deviceLinesMap } = useMemo(() => {
		const devicesMap = new Map<Device["id"], Device>();
		const devicesIdKeyMap = new Map<Device["id"], number>();
		const deviceLinesMap = new Map<
			Device["line"]["id"],
			Device["line"]["name"]
		>();

		devices.forEach((device, index) => {
			devicesMap.set(device.id, device);
			devicesIdKeyMap.set(device.id, index);

			if (!deviceLinesMap.has(device.line.id)) {
				deviceLinesMap.set(device.line.id, device.line.name);
			}
		});

		return { devicesMap, devicesIdKeyMap, deviceLinesMap };
	}, [devices]);

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
		const device = getDevice(id);

		if (!device) {
			return null;
		}

		return `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${device.id}/default/${device.images.default}.png&w=${size}&q=75`;
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
