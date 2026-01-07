import { useState } from "react";

type FilterConfig<T> = {
	getSearchableText: (item: T) => string[];
	getCategoryId: (item: T) => string;
	getCategoryName: (item: T) => string;
};

export function useFiltersFunctionality<T>(
	items: T[],
	config: FilterConfig<T>
) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(
		new Set()
	);

	const { getSearchableText, getCategoryId, getCategoryName } = config;

	const searchFilteredItems = !searchQuery.trim()
		? items
		: items.filter((item) => {
				const query = searchQuery.toLowerCase().trim();
				const searchableTexts = getSearchableText(item);
				return searchableTexts.some((text) =>
					text.toLowerCase().includes(query)
				);
			});

	const availableCategories = (() => {
		const categoriesMap = new Map<string, string>();
		searchFilteredItems.forEach((item) => {
			const categoryId = getCategoryId(item);
			if (!categoriesMap.has(categoryId)) {
				categoriesMap.set(categoryId, getCategoryName(item));
			}
		});
		return Array.from(categoriesMap.entries())
			.map(([id, name]) => ({ id, name }))
			.sort((a, b) => a.name.localeCompare(b.name));
	})();

	const filteredItems =
		selectedCategoryIds.size > 0
			? searchFilteredItems.filter((item) =>
					selectedCategoryIds.has(getCategoryId(item))
				)
			: searchFilteredItems;

	const toggleCategory = (categoryId: string) => {
		setSelectedCategoryIds((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(categoryId)) {
				newSet.delete(categoryId);
			} else {
				newSet.add(categoryId);
			}
			return newSet;
		});
	};

	const resetCategoryFilters = () => {
		setSelectedCategoryIds(new Set());
	};

	return {
		searchQuery,
		availableCategories,
		selectedCategoryIds,
		filteredItems,

		setSearchQuery,
		toggleCategory,
		resetCategoryFilters,
	};
}
