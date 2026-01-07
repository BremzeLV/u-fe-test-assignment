import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../SearchInput";

type TestItem = {
	id: string;
	name: string;
};

describe("SearchInput", () => {
	const mockItems: TestItem[] = [
		{ id: "1", name: "Access Point" },
		{ id: "2", name: "Switch" },
		{ id: "3", name: "Router" },
	];

	it("renders search input with placeholder", () => {
		render(
			<SearchInput
				searchQuery=""
				filteredItems={mockItems}
				onSearchChange={vi.fn()}
				getName={(item) => item.name}
			/>
		);

		expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
	});

	it("calls onSearchChange when typing", async () => {
		const handleSearchChange = vi.fn();
		const user = userEvent.setup();
		render(
			<SearchInput
				searchQuery=""
				filteredItems={mockItems}
				onSearchChange={handleSearchChange}
				getName={(item) => item.name}
			/>
		);

		const input = screen.getByPlaceholderText("Search");
		await user.type(input, "test");

		expect(handleSearchChange).toHaveBeenCalled();
	});

	it("shows dropdown when there are filtered items and query exists", async () => {
		const user = userEvent.setup();
		render(
			<SearchInput
				searchQuery="Access"
				filteredItems={[{ id: "1", name: "Access Point" }]}
				onSearchChange={vi.fn()}
				getName={(item) => item.name}
			/>
		);

		const input = screen.getByPlaceholderText("Search");
		await user.click(input);

		await waitFor(() => {
			expect(screen.getByText("Access Point")).toBeInTheDocument();
		});
	});

	it("displays filtered items passed as props", () => {
		render(
			<SearchInput
				searchQuery="Switch"
				filteredItems={[{ id: "2", name: "Switch" }]}
				onSearchChange={vi.fn()}
				getName={(item) => item.name}
			/>
		);

		const input = screen.getByPlaceholderText("Search");
		expect(input).toHaveValue("Switch");
	});

	it("selects item from dropdown and closes it", async () => {
		const handleSearchChange = vi.fn();
		const user = userEvent.setup();
		render(
			<SearchInput
				searchQuery=""
				filteredItems={mockItems}
				onSearchChange={handleSearchChange}
				getName={(item) => item.name}
			/>
		);

		const input = screen.getByPlaceholderText("Search");
		await user.type(input, "Access");

		const item = await screen.findByText("Access Point");
		await user.click(item);

		expect(handleSearchChange).toHaveBeenCalledWith("Access Point");

		await waitFor(() => {
			expect(screen.queryByText("Access Point")).not.toBeInTheDocument();
		});
	});

	it("closes dropdown when clicking outside", async () => {
		const user = userEvent.setup();
		render(
			<SearchInput
				searchQuery="Access"
				filteredItems={mockItems}
				onSearchChange={vi.fn()}
				getName={(item) => item.name}
			/>
		);

		const input = screen.getByPlaceholderText("Search");
		await user.click(input);

		await waitFor(() => {
			expect(screen.getByText("Access Point")).toBeInTheDocument();
		});

		await user.click(document.body);

		await waitFor(() => {
			expect(screen.queryByText("Access Point")).not.toBeInTheDocument();
		});
	});
});
