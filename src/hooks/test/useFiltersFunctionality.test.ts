import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFiltersFunctionality } from "../useFiltersFunctionality";

type TestItem = {
	id: string;
	name: string;
	category: string;
};

const mockItems: TestItem[] = [
	{ id: "1", name: "Access Point", category: "WiFi" },
	{ id: "2", name: "Switch", category: "Networking" },
	{ id: "3", name: "Router", category: "WiFi" },
	{ id: "4", name: "Camera", category: "Security" },
];

const mockConfig = {
	getSearchableText: (item: TestItem) => [item.name, item.category],
	getCategoryId: (item: TestItem) => item.category,
	getCategoryName: (item: TestItem) => item.category,
};

describe("useFiltersFunctionality", () => {
	it("returns all items when no filters applied", () => {
		const { result } = renderHook(() =>
			useFiltersFunctionality(mockItems, mockConfig)
		);

		expect(result.current.filteredItems).toHaveLength(4);
		expect(result.current.searchQuery).toBe("");
	});

	it("filters items by search query", () => {
		const { result } = renderHook(() =>
			useFiltersFunctionality(mockItems, mockConfig)
		);

		act(() => {
			result.current.setSearchQuery("switch");
		});

		expect(result.current.filteredItems).toHaveLength(1);
		expect(result.current.filteredItems[0].name).toBe("Switch");
	});

	it("searches and filters by category", () => {
		const { result } = renderHook(() =>
			useFiltersFunctionality(mockItems, mockConfig)
		);

		act(() => {
			result.current.setSearchQuery("point");
			result.current.toggleCategory("WiFi");
		});

		expect(result.current.filteredItems).toHaveLength(1);
		expect(result.current.filteredItems[0].name).toBe("Access Point");
	});

	it("resets category filters", () => {
		const { result } = renderHook(() =>
			useFiltersFunctionality(mockItems, mockConfig)
		);

		act(() => {
			result.current.toggleCategory("WiFi");
			result.current.toggleCategory("Security");
		});

		expect(result.current.selectedCategoryIds.size).toBe(2);

		act(() => {
			result.current.resetCategoryFilters();
		});

		expect(result.current.selectedCategoryIds.size).toBe(0);
		expect(result.current.filteredItems).toHaveLength(4);
	});
});
