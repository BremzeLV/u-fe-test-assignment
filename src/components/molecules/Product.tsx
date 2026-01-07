import { Button } from "../atoms/Button";
import NoDevice from "../../assets/no-device.png";
import { useState } from "react";

type ProductProps = {
	header: string;
	subHeader: string;
	lineItems: { label: string; value: string | number | undefined }[];
	fullData: object;
	productImageUrl: string | null;
};

export function Product({
	header,
	subHeader,
	lineItems,
	productImageUrl,
	fullData,
}: ProductProps) {
	const [showAllDetails, setShowAllDetails] = useState(false);

	return (
		<>
			<div className="grid gap-8 md:grid-cols-[292px_1fr] px-8 md:px-0">
				<div>
					<img
						className="object-contain mx-auto w-full max-w-[292px]"
						src={productImageUrl ?? NoDevice}
						alt={header}
					/>
				</div>

				<div>
					<div className="text-unifi-t01">{header}</div>
					<div className="text-unifi-t03 mt-1">{subHeader}</div>
					<div className="table w-full py-4">
						{lineItems.map(({ label, value }, index) => (
							<div key={`${label}-${index}`} className="table-row py-1.5">
								<div className="table-cell text-unifi-t01">{label}</div>
								<div className="table-cell text-unifi-t03 text-right">
									{value}
								</div>
							</div>
						))}
					</div>
					<Button
						onClick={() => setShowAllDetails(!showAllDetails)}
						variant="text"
						color="cta"
					>
						{showAllDetails ? "Hide Details" : "See All Details as JSON"}
					</Button>
				</div>
			</div>

			{showAllDetails && (
				<div className="border border-unifi-n03 rounded-sm px-8 md:px-0 mt-4 text-unifi-t03 break-all">
					<pre className="text-[8px] p-2">
						{JSON.stringify(fullData, null, 2)}
					</pre>
				</div>
			)}
		</>
	);
}
