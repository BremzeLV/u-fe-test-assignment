import { ProductCard, type ProductCardProps } from "../molecules/ProductCard";

type ProductGridProps<T extends ProductCardProps> = {
	items: T[];
	imageGetter: (id: string, size: number) => string | null;
};

export function ProductGrid<T extends ProductCardProps>({
	items,
	imageGetter,
}: ProductGridProps<T>) {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 text-sm">
			{items.map((item) => (
				<ProductCard
					key={item.id}
					id={item.id}
					title={item.title}
					subtitle={item.subtitle}
					badge={item.badge}
					imageUrl={imageGetter(item.id, 150)}
				/>
			))}
		</div>
	);
}
