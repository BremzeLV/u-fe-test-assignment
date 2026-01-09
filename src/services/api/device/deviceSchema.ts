import { z } from "zod";

const unifiSchema = z
	.object({
		network: z
			.object({
				radios: z
					.object({
						na: z
							.object({
								maxPower: z.number().optional(),
								maxSpeedMegabitsPerSecond: z.number().optional(),
							})
							.optional(),
					})
					.optional(),
				numberOfPorts: z.number().optional(),
			})
			.optional(),
	})
	.optional();

export const deviceSchemaLoose = z
	.object({
		id: z.string(),
		line: z.object({
			id: z.string(),
			name: z.string(),
		}),
		product: z.object({
			name: z.string(),
		}),
		shortnames: z.array(z.string()),
		sku: z.string(),
		images: z
			.object({
				default: z.string(),
			})
			.and(z.record(z.string(), z.string())),
		unifi: unifiSchema,
	})
	.loose();

export const deviceSchemaLooseDefault = z
	.object({
		id: z.string(),
		line: z.object({
			id: z.string().default(""),
			name: z.string().default(""),
		}),
		product: z.object({
			name: z.string().default(""),
		}),
		shortnames: z.array(z.string()).default([]),
		sku: z.string().default(""),
		images: z
			.object({
				default: z.string().default(""),
			})
			.and(z.record(z.string(), z.string())),
		unifi: unifiSchema,
	})
	.loose();

const devicesResponseSchema = z.object({
	devices: z.array(deviceSchemaLoose),
	version: z.string(),
});

const devicesResponseSchemaPartial = z
	.object({
		devices: z.array(deviceSchemaLooseDefault),
		version: z.string(),
	})
	.partial()
	.default({ devices: [], version: "" });

export function parseDevicesResponse(data: DevicesResponse): DevicesResponse {
	const result = devicesResponseSchema.safeParse(data);
	if (result.success) {
		return result.data;
	}

	console.warn("Devices response validation failed:", result.error);

	const partialResult = devicesResponseSchemaPartial.safeParse(data);
	if (partialResult.success) {
		return {
			devices: partialResult.data?.devices ?? [],
			version: partialResult.data?.version ?? "",
		};
	}

	console.warn(
		"Devices response partial validation failed:",
		partialResult.error
	);

	return {
		devices: [],
		version: "",
	};
}

export type Device = z.infer<typeof deviceSchemaLoose>;
export type DevicesResponse = z.infer<typeof devicesResponseSchema>;
