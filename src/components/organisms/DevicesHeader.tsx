import { DevicesViewControls } from "./DevicesViewControls";
import { SearchInput } from "../molecules/SearchInput";
import type { ViewType } from "../types";
import { SubHeader } from "../layouts/SubHeader";
import { useFilters } from "../../hooks";
import type { Device } from "../../services/api/device/deviceSchema";

type DevicesHeaderProps = {
	viewType: ViewType;
	toggleView: (viewType: ViewType) => void;
};

export function DevicesHeader({ viewType, toggleView }: DevicesHeaderProps) {
	const { searchQuery, setSearchQuery, filteredItems } = useFilters<Device>();

	const getShortestShortname = (device: Device): string => {
		return (
			device.shortnames.reduce((a: string, b: string): string =>
				b.length < a.length ? b : a
			) ?? ""
		);
	};

	return (
		<SubHeader
			left={
				<div className="flex items-center">
					<SearchInput
						className="w-60 md:w-80"
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						filteredItems={filteredItems}
						getName={(device) => device.product.name}
						getSubtitle={(device) => getShortestShortname(device)}
						getKey={(device) => device.id}
					/>
					<span className="pl-4">{filteredItems.length} Devices</span>
				</div>
			}
			right={
				<DevicesViewControls viewType={viewType} toggleView={toggleView} />
			}
		/>
	);
}
