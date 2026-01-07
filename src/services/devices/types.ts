export type Device = {
	id: string;
	deviceType: string;
	fcc?: string;
	guids: string[];
	ic?: string;
	btle?: {
		factoryDefault: string;
		userConfigured: string;
	};
	icon: {
		id: string;
		resolutions: number[][];
	};
	images: Record<string, string>;
	isARSupported?: boolean;
	line: {
		id: string;
		name: string;
	};
	minAdoptVersion?: {
		net?: string;
		protect?: string;
	};
	product: {
		abbrev: string;
		name: string;
	};
	shortnames: string[];
	sku: string;
	sysid?: string;
	sysids: string[];
	triplets: { [key: string]: string }[];
	uisp?: {
		bleServices: object;
		firmware: {
			board: string[];
			platform: string | null;
		};
		line: string;
		nameLegacy: string[];
	};
	jpa?: string[];
	jrf?: string[];
	unifi?: {
		adoptability?: string;
		protect?: {
			fov: number;
			suggestedDistance: number;
		};
		network?: {
			model: string;
			type: string;
			radios: {
				"6e"?: {
					gain?: number;
					maxPower?: number;
					maxSpeedMegabitsPerSecond: number;
				};
				na?: {
					gain?: number;
					maxPower?: number;
					maxSpeedMegabitsPerSecond: number;
				};
				ng?: {
					gain?: number;
					maxPower?: number;
					maxSpeedMegabitsPerSecond: number;
				};
				swift?: {
					gain: number;
					maxPower: number;
				};
			};
			chipset?: string;
			deviceCapabilities?: string[];
			ethernetMaxSpeedMegabitsPerSecond?: number;
			minimumFirmwareRequired?: string | null;
			hybrid?: string;
			numberOfPorts?: number;
			optionalWanPortIndexes?: number[];
			optionalWanPortNumbers?: number[];
			diagram?: string[];
			outletsDiagram?: string[];
			outletsDiagramMobile?: string[];
			primaryOutletGroupCount?: number;
			primaryPortGroupCount?: number;
			knownUnsupportedFeatures?: string[];
			subtypes?: string[];
			switchPorts?: number[];
			rps?: {
				diagram: string[];
				primaryPortGroupCount: number;
			};
			shadowMode?: {
				interconnectPortInterface: string;
				interconnectPortNumber: number;
			};
			systemIdHexadecimal?: string;
			features?: Record<string, unknown>;
			details?: Record<string, string | boolean>;
			bleServices?: Record<string, unknown>[];
			ports?: Record<string, unknown>;
			outlets?: Record<string, unknown>;
			ipsLimits?: Record<string, unknown>;
			linkNegotiation?: Record<string, unknown>;
			mdnsLimits?: Record<string, number>;
			networkGroups?: Record<string, string>;
			power?: Record<string, number>;
			temperatureSensors?: Record<string, unknown> | unknown[];
		};
	};
	compliance?: Record<string, unknown>;
	videos: { [key: string]: string }[] | object;
};

export type DevicesResponse = {
	devices: Device[];
};
