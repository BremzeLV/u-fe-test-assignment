import { Button } from "../atoms/Button";
import { SubHeader } from "./SubHeader";
import ArrowLeft from "../../assets/arrow-left.svg?react";
import ArrowRight from "../../assets/arrow-right.svg?react";
import { useNavigate, useParams } from "react-router";
import { Product } from "../molecules/Product";
import { useDevices } from "../../hooks";

export function DeviceView() {
	const { getDevice, getPrevNextDevice, getDeviceImage } = useDevices();

	const navigate = useNavigate();
	const { id } = useParams();

	if (!id) {
		return <>No Device ID provided</>;
	}

	const device = getDevice(id);

	if (!device) {
		return <div className="text-center p-8">No Device found</div>;
	}

	const prevNextDevice = getPrevNextDevice(device.id);

	const deviceData = [
		{ label: "Product Line", value: device.line.name },
		{ label: "ID", value: device.id },
		{ label: "Name", value: device.product.name },
		{ label: "Short Name", value: device.shortnames.join(", ") },
		...(device.unifi?.network?.radios?.na?.maxPower
			? [
					{
						label: "Max. Power",
						value: `${device.unifi.network.radios.na.maxPower} W`,
					},
				]
			: []),
		...(device.unifi?.network?.radios?.na?.maxSpeedMegabitsPerSecond
			? [
					{
						label: "Speed",
						value: `${device.unifi.network.radios.na.maxSpeedMegabitsPerSecond} Mbps`,
					},
				]
			: []),
		...(device.unifi?.network?.numberOfPorts
			? [
					{
						label: "Number of Ports",
						value: device.unifi.network.numberOfPorts,
					},
				]
			: []),
	];

	return (
		<>
			<SubHeader
				left={
					<Button
						onClick={() => navigate("/")}
						variant="secondary"
						icon={<ArrowLeft />}
					>
						Back
					</Button>
				}
				right={
					<div className="flex items-center space-x-1">
						{prevNextDevice.prev && (
							<Button
								variant="secondary"
								icon={<ArrowLeft />}
								onClick={() => navigate(`/device/${prevNextDevice.prev.id}`)}
							/>
						)}

						{prevNextDevice.next && (
							<Button
								variant="secondary"
								icon={<ArrowRight />}
								onClick={() => navigate(`/device/${prevNextDevice.next.id}`)}
							/>
						)}
					</div>
				}
			/>

			<div className="max-w-3xl mx-auto py-4">
				<Product
					header={device.product.name}
					subHeader={device.line.name}
					lineItems={deviceData}
					fullData={device}
					productImageUrl={getDeviceImage(device.id, 292)}
				/>
			</div>
		</>
	);
}
