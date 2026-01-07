import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDevicesDomain } from "../useDeviceFunctionality";
import type { Device } from "../../services/devices/types";

const mockDevices: Device[] = [
	{
		id: "device1",
		deviceType: "access-point",
		guids: [],
		icon: { id: "icon1", resolutions: [[10, 10]] },
		images: { default: "image1" },
		line: { id: "line1", name: "WiFi 6" },
		product: { abbrev: "U6", name: "Access Point" },
		shortnames: ["u6-pro"],
		sku: "U6-PRO",
		sysids: [],
		triplets: [],
		videos: [],
	},
	{
		id: "device2",
		deviceType: "switch",
		guids: [],
		icon: { id: "icon2", resolutions: [[10, 10]] },
		images: { default: "image2" },
		line: { id: "line2", name: "Switches" },
		product: { abbrev: "USW", name: "Switch" },
		shortnames: ["usw-24"],
		sku: "USW-24",
		sysids: [],
		triplets: [],
		videos: [],
	},
	{
		id: "device3",
		deviceType: "router",
		guids: [],
		icon: { id: "icon3", resolutions: [[10, 10]] },
		images: { default: "image3" },
		line: { id: "line1", name: "WiFi 6" },
		product: { abbrev: "UDM", name: "Router" },
		shortnames: ["udm-pro"],
		sku: "UDM-PRO",
		sysids: [],
		triplets: [],
		videos: [],
	},
];

describe("useDevicesDomain", () => {
	it("returns devices array", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		expect(result.current.devices).toEqual(mockDevices);
		expect(result.current.devices).toHaveLength(3);
	});

	it("gets device by id", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		const device = result.current.getDevice("device2");

		expect(device).toBeDefined();
		expect(device?.id).toBe("device2");
	});

	it("returns null when device is not found", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		const device = result.current.getDevice("random");

		expect(device).toBeNull();
	});

	it("gets previous and next device", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		const { prev, next } = result.current.getPrevNextDevice("device2");

		expect(prev?.id).toBe("device1");
		expect(next?.id).toBe("device3");
	});

	it("returns null for prev when on first device", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		const { prev, next } = result.current.getPrevNextDevice("device1");

		expect(prev).toBeNull();
		expect(next?.id).toBe("device2");
	});

	it("returns null for next when on last device", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		const { prev, next } = result.current.getPrevNextDevice("device3");

		expect(prev?.id).toBe("device2");
		expect(next).toBeNull();
	});

	it("generates device image URL", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		const imageUrl = result.current.getDeviceImage("device1", 150);

		expect(imageUrl).toContain("device1");
		expect(imageUrl).toContain("image1");
		expect(imageUrl).toContain("w=150");
	});

	it("returns null for image when device doesn't exist", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		const imageUrl = result.current.getDeviceImage("random", 150);

		expect(imageUrl).toBeNull();
	});

	it("builds device lines map", () => {
		const { result } = renderHook(() => useDevicesDomain(mockDevices));

		expect(result.current.deviceLinesMap.has("line1")).toBe(true);
		expect(result.current.deviceLinesMap.has("line2")).toBe(true);
	});
});
