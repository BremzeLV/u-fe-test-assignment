import { createContext, useContext, type ReactNode } from "react";
import { useFiltersFunctionality } from "../useFiltersFunctionality";

type FilterConfig<T> = {
	getSearchableText: (item: T) => string[];
	getCategoryId: (item: T) => string;
	getCategoryName: (item: T) => string;
};

const FiltersContext = createContext<ReturnType<
	typeof useFiltersFunctionality
> | null>(null);

type FiltersProviderProps<T> = {
	items: T[];
	config: FilterConfig<T>;
	children: ReactNode;
};

export function FiltersProvider<T>({
	children,
	items,
	config,
}: FiltersProviderProps<T>) {
	const filters = useFiltersFunctionality(items, config);

	return (
		<FiltersContext.Provider value={filters}>
			{children}
		</FiltersContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFilters<T>() {
	const context = useContext(FiltersContext) as ReturnType<
		typeof useFiltersFunctionality<T>
	> | null;
	if (!context) {
		throw new Error("useFilters must be used within a FiltersProvider");
	}
	return context;
}
