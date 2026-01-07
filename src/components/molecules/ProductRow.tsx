import { Link } from "react-router";
import NoDevice from "../../assets/no-device.png";

export type ProductRowProps = {
	id: string;
	title: string;
	subtitle: string;
	imageUrl: string | null;
};

export function ProductRow({ id, title, subtitle, imageUrl }: ProductRowProps) {
	return (
		<Link
			to={`/device/${id}`}
			className="table-row border-b border-unifi-n03 hover:bg-unifi-n02 unifi-focus-visible-row focus-visible:outline-none"
		>
			<div className="table-cell px-2 py-1.5 w-9">
				<img className="inline-block" src={imageUrl ?? NoDevice} alt={title} />
			</div>
			<div className="table-cell px-2 py-1.5 text-unifi-t02">{subtitle}</div>
			<div className="table-cell px-2 py-1.5 text-unifi-t03">{title}</div>
		</Link>
	);
}
