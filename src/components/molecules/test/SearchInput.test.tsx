import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../SearchInput";
import type { Device } from "../../../services/api/device/deviceSchema";

describe("SearchInput", () => {
	const mockItems: Partial<Device>[] = [
		{ id: "1", product: { name: "Access Point" }, shortnames: ["u6-pro"] },
		{ id: "2", product: { name: "Switch" }, shortnames: ["usw-24"] },
		{ id: "3", product: { name: "Router" }, shortnames: ["udm-pro"] },
	];

	it("renders search input with placeholder", () => {
		render(
			<SearchInput
				searchQuery=""
				filteredItems={mockItems}
				onSearchChange={vi.fn()}
				getName={(item) => item!.product!.name}
				getSubtitle={(item) => item!.shortnames![0]}
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
				getName={(item) => item!.product!.name}
				getSubtitle={(item) => item!.shortnames![0]}
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
				filteredItems={[
					{
						id: "1",
						product: { name: "Access Point" },
						shortnames: ["u6-pro"],
					},
				]}
				onSearchChange={vi.fn()}
				getName={(item) => item!.product!.name}
				getSubtitle={(item) => item!.shortnames![0]}
			/>
		);

		const input = screen.getByPlaceholderText("Search");
		await user.click(input);

		await waitFor(() => {
			expect(screen.getByText("Access")).toBeInTheDocument();
		});
	});

	it("displays filtered items passed as props", () => {
		render(
			<SearchInput
				searchQuery="Switch"
				filteredItems={[
					{ id: "2", product: { name: "Switch" }, shortnames: ["usw-24"] },
				]}
				onSearchChange={vi.fn()}
				getName={(item) => item!.product!.name}
				getSubtitle={(item) => item!.shortnames![0]}
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
				getName={(item) => item!.product!.name}
				getSubtitle={(item) => item!.shortnames![0]}
			/>
		);

		const input = screen.getByPlaceholderText("Search");
		await user.type(input, "Access");

		const item = await screen.findByText("Access");
		await user.click(item);

		expect(handleSearchChange).toHaveBeenCalledWith("Access");

		await waitFor(() => {
			expect(screen.queryByText("Access")).not.toBeInTheDocument();
		});
	});

	it("closes dropdown when clicking outside", async () => {
		const user = userEvent.setup();
		render(
			<SearchInput
				searchQuery="Access"
				filteredItems={mockItems}
				onSearchChange={vi.fn()}
				getName={(item) => item!.product!.name}
				getSubtitle={(item) => item!.shortnames![0]}
			/>
		);

		const input = screen.getByPlaceholderText("Search");
		await user.click(input);

		await waitFor(() => {
			expect(screen.getByText("Access")).toBeInTheDocument();
		});

		await user.click(document.body);

		await waitFor(() => {
			expect(screen.queryByText("Access")).not.toBeInTheDocument();
		});
	});
});
