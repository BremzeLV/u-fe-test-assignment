import { ProductRow, type ProductRowProps } from "../molecules/ProductRow";

type ProductTableProps<T extends ProductRowProps> = {
	header: string[];
	items: T[];
	imageGetter: (id: string, size: number) => string | null;
};

export function ProductTable<T extends ProductRowProps>({
	header,
	items,
	imageGetter,
}: ProductTableProps<T>) {
	return (
		<div className="table w-full px-8 text-sm border-collapse">
			<div className="sticky top-0 table-row text-unifi-t01 font-bold bg-unifi-w01 border-b border-unifi-n03">
				<div className="table-cell px-2 py-1.5 w-9">
					<div className="w-[20px] h-[20px]"></div>
				</div>
				{header.map((headerTitle) => (
					<div
						key={headerTitle.replace(" ", "-").toLowerCase()}
						className="table-cell px-2 py-1.5"
					>
						{headerTitle}
					</div>
				))}
			</div>

			{items.map((item) => (
				<ProductRow
					key={item.id}
					id={item.id}
					title={item.title}
					subtitle={item.subtitle}
					imageUrl={imageGetter(item.id, 20)}
				/>
			))}
		</div>
	);
}
