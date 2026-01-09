import type { DevicesResponse } from "./deviceSchema";
import { parseDevicesResponse } from "./deviceSchema";

import { axiosInstance } from "../../../lib/axios-instance";

export async function fetchDevices(): Promise<DevicesResponse> {
	const response = await axiosInstance.get<DevicesResponse>("/public.json");

	return parseDevicesResponse(response.data);
}
