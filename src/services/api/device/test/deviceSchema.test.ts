import { describe, it } from "vitest";
import { parseDevicesResponse, type DevicesResponse } from "../deviceSchema";

describe("deviceSchema", () => {
	beforeEach(() => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const devicesResponse: DevicesResponse = {
		devices: [
			{
				id: "1",
				name: "Device 1",
				line: {
					id: "1",
					name: "Line 1",
				},
				product: {
					name: "Product 1",
				},
				shortnames: ["device1"],
				sku: "1234567890",
				images: {
					default: "image1",
				},
				unifi: {
					network: {
						numberOfPorts: 1,
					},
				},
			},
			{
				id: "2",
				name: "Device 2",
				line: {
					id: "2",
					name: "Line 2",
				},
				product: {
					name: "Product 2",
				},
				shortnames: ["device2"],
				sku: "1234567890",
				images: {
					default: "image2",
				},
			},
		],
		version: "1.0.0",
	};

	it("parses devices response", () => {
		const result = parseDevicesResponse(devicesResponse);

		expect(result.devices.length).toBe(2);
		expect(result.version).toBe("1.0.0");
	});

	it("should parse devices response with partial data", () => {
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		const devicesResponseClone = structuredClone(devicesResponse);
		// @ts-expect-error -- we want to partially break the schema
		devicesResponseClone.devices[0].line.name = undefined;

		const result = parseDevicesResponse(devicesResponseClone);

		expect(result.devices[0].line.name).toBe("");
		expect(result.version).toBe("1.0.0");
		expect(warnSpy).toHaveBeenCalledTimes(1);
	});

	it("should log error when parsing devices response fails", () => {
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		const devicesResponseClone = structuredClone(devicesResponse);
		// @ts-expect-error -- we want to break the schema
		delete devicesResponseClone.devices[0].id;

		const result = parseDevicesResponse(devicesResponseClone);

		expect(result.devices.length).toBe(0);
		expect(warnSpy).toHaveBeenCalledTimes(2);
	});
});
