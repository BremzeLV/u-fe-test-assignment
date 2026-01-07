import axios from "axios";
import type { DevicesResponse } from "./types";

export async function fetchDevices(): Promise<DevicesResponse> {
	const response = await axios.get<DevicesResponse>(
		"https://static.ui.com/fingerprint/ui/public.json"
	);
	return response.data;
}
