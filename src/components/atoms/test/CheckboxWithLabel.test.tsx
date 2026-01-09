import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckboxWithLabel } from "../CheckboxWithLabel";

describe("CheckboxWithLabel", () => {
	it("renders checkbox with label", () => {
		render(
			<CheckboxWithLabel
				checked={false}
				onChange={vi.fn()}
				label="Product Line"
				id="test-id"
			/>
		);

		const checkbox = screen.getByRole("checkbox", { name: /product line/i });

		expect(checkbox).toBeInTheDocument();
		expect(screen.getByText("Product Line")).toBeInTheDocument();
	});

	it("calls onChange when checkbox is clicked", async () => {
		const handleChange = vi.fn();
		const user = userEvent.setup();
		render(
			<CheckboxWithLabel
				checked={false}
				onChange={handleChange}
				label="Product Line"
				id="test-id"
			/>
		);

		const checkbox = screen.getByRole("checkbox");
		await user.click(checkbox);

		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it("calls onChange with false when unchecking", async () => {
		const handleChange = vi.fn();
		const user = userEvent.setup();
		render(
			<CheckboxWithLabel
				checked={true}
				onChange={handleChange}
				label="Product Line"
				id="test-id"
			/>
		);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeChecked();

		await user.click(checkbox);

		expect(handleChange).toHaveBeenCalledWith(false);
	});

	it("shows checked state correctly", () => {
		render(
			<CheckboxWithLabel
				checked={true}
				onChange={vi.fn()}
				label="Product Line"
				id="test-id"
			/>
		);

		expect(screen.getByRole("checkbox")).toBeChecked();
	});

	it("shows unchecked state correctly", () => {
		render(
			<CheckboxWithLabel
				checked={false}
				onChange={vi.fn()}
				label="Product Line"
				id="test-id"
			/>
		);

		expect(screen.getByRole("checkbox")).not.toBeChecked();
	});

	it("associates label with checkbox via id", () => {
		render(
			<CheckboxWithLabel
				checked={false}
				onChange={vi.fn()}
				label="Product Line"
				id="custom-id"
			/>
		);

		const checkbox = screen.getByRole("checkbox");
		const label = screen.getByText("Product Line");

		expect(checkbox).toHaveAttribute("id", "custom-id");
		expect(label).toHaveAttribute("for", "custom-id");
	});
});
