import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "../Dropdown";

describe("Dropdown", () => {
	it("renders trigger button with text", async () => {
		const user = userEvent.setup();

		render(
			<Dropdown triggerText="Filter" isActive={false}>
				<div>
					<button>Action 1</button>
					<button>Action 2</button>
				</div>
			</Dropdown>
		);

		const trigger = screen.getByRole("button", { name: /filter/i });
		await user.click(trigger);

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: /action 1/i })
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /action 2/i })
			).toBeInTheDocument();
		});
	});

	it("opens dropdown when trigger is clicked", async () => {
		const user = userEvent.setup();
		render(
			<Dropdown triggerText="Filter" isActive={false}>
				<div>Dropdown content</div>
			</Dropdown>
		);

		const trigger = screen.getByRole("button", { name: /filter/i });
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByText("Dropdown content")).toBeInTheDocument();
		});
	});

	it("closes dropdown when clicking outside", async () => {
		const user = userEvent.setup();
		render(
			<Dropdown triggerText="Filter" isActive={false}>
				<div>Dropdown content</div>
			</Dropdown>
		);

		const trigger = screen.getByRole("button", { name: /filter/i });
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByText("Dropdown content")).toBeInTheDocument();
		});

		await user.click(document.body);

		await waitFor(() => {
			expect(screen.queryByText("Dropdown content")).not.toBeInTheDocument();
		});
	});
});
