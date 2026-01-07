import { DevicesViewControls } from "./DevicesViewControls";
import { SearchInput } from "../molecules/SearchInput";
import type { ViewType } from "../types";
import { SubHeader } from "../layouts/SubHeader";
import { useFilters } from "../../hooks";
import type { Device } from "../../services/devices/types";

type DevicesHeaderProps = {
	viewType: ViewType;
	toggleView: (viewType: ViewType) => void;
};

export function DevicesHeader({ viewType, toggleView }: DevicesHeaderProps) {
	const { searchQuery, setSearchQuery, filteredItems } = useFilters<Device>();

	return (
		<SubHeader
			left={
				<div className="flex items-center">
					<SearchInput
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						filteredItems={filteredItems}
						getName={(device) => device.product.name}
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
