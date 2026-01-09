import { Link } from "react-router";
import NoDevice from "../../assets/no-device.png";

export type ProductCardProps = {
	id: string;
	title: string;
	subtitle: string;
	badge: string;
	imageUrl: string | null;
};

export function ProductCard({
	id,
	title,
	subtitle,
	badge,
	imageUrl,
}: ProductCardProps) {
	return (
		<Link
			className="group relative rounded-lg border border-unifi-n03 hover:bg-unifi-n01"
			to={`/device/${id}`}
		>
			<div className="flex items-center justify-center rounded-t-lg bg-unifi-n01 group-hover:bg-unifi-n02">
				<div className="absolute rounded-sm bg-unifi-n00 text-unifi-n06 px-1 py-0.5 top-0.75 right-0.75">
					{badge}
				</div>
				<img
					className="object-contain m-auto"
					src={imageUrl ?? NoDevice}
					alt={title.replace(/\s+/g, "-").toLowerCase()}
				/>
			</div>
			<div className="p-2">
				<div className="text-unifi-t01 min-h-10">{title}</div>
				<div className="text-unifi-t03">{subtitle}</div>
			</div>
		</Link>
	);
}
