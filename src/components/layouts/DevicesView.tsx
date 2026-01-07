import { ViewType } from "../types";
import { ProductGrid } from "../organisms/ProductGrid";
import { ProductTable } from "../organisms/ProductTable";
import { DevicesHeader } from "../organisms/DevicesHeader";
import { useDevices, useFilters } from "../../hooks";
import type { Device } from "../../services/devices/types";
import type { ProductCardProps } from "../molecules/ProductCard";

export function DevicesView() {
	const { deviceViewType, setDevicesViewType, getDeviceImage } = useDevices();
	const { filteredItems } = useFilters<Device>();

	const items: ProductCardProps[] = filteredItems.map((device) => ({
		id: device.id,
		title: device.product.name,
		subtitle: device.sku,
		badge: device.line.name,
		imageUrl: getDeviceImage(device.id, 150),
	}));

	return (
		<>
			<DevicesHeader
				viewType={deviceViewType}
				toggleView={setDevicesViewType}
			/>

			{deviceViewType === ViewType.Table ? (
				<div className="px-2 md:px-8">
					<ProductTable
						header={["Product Line", "Name"]}
						items={items}
						imageGetter={getDeviceImage}
					/>
				</div>
			) : (
				<div className="px-2 md:px-8 py-4">
					<ProductGrid items={items} imageGetter={getDeviceImage} />
				</div>
			)}
		</>
	);
}
