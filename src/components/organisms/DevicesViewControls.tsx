import Tiles from "../../assets/tiles.svg?react";
import List from "../../assets/list.svg?react";
import { Button } from "../atoms/Button";
import { Dropdown } from "../molecules/Dropdown";
import { ViewType } from "../types";
import { Label } from "../atoms/Label";
import { useFilters } from "../../hooks";
import type { Device } from "../../services/devices/types";

type DevicesViewControlsProps = {
	viewType: ViewType;
	toggleView: (viewType: ViewType) => void;
};

export function DevicesViewControls({
	viewType,
	toggleView,
}: DevicesViewControlsProps) {
	const {
		availableCategories: availableProductLines,
		selectedCategoryIds: selectedProductLineIds,
		toggleCategory: toggleProductLine,
		resetCategoryFilters: resetProductLineFilters,
	} = useFilters<Device>();

	return (
		<div className="flex items-center space-x-1">
			<Button
				isActive={viewType === ViewType.Table}
				onClick={() => toggleView(ViewType.Table)}
			>
				<List />
			</Button>

			<Button
				isActive={viewType === ViewType.Grid}
				onClick={() => toggleView(ViewType.Grid)}
			>
				<Tiles />
			</Button>

			<Dropdown triggerText="Filter" isActive={selectedProductLineIds.size > 0}>
				<div className="text-unifi-t01 font-bold mb-2">Product line</div>
				<div className="my-2 space-y-2 max-h-64 overflow-y-auto -mx-1 px-1">
					{availableProductLines.length === 0 ? (
						<div className="text-sm text-unifi-t02 py-2">
							No product lines to filter from
						</div>
					) : (
						availableProductLines.map((line) => (
							<Label
								key={line.id}
								id={`product-line-${line.id}`}
								checked={selectedProductLineIds.has(line.id)}
								onChange={() => toggleProductLine(line.id)}
								label={line.name}
							/>
						))
					)}
				</div>

				<Button
					variant="text"
					color="error"
					disabled={selectedProductLineIds.size === 0}
					onClick={resetProductLineFilters}
				>
					Reset
				</Button>
			</Dropdown>
		</div>
	);
}
