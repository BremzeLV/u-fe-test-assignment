import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("Button", () => {
	it("renders button with children", () => {
		render(<Button>Click me</Button>);

		expect(
			screen.getByRole("button", { name: /click me/i })
		).toBeInTheDocument();
	});

	it("calls onClick when clicked", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();
		render(<Button onClick={handleClick}>Click me</Button>);

		await user.click(screen.getByRole("button"));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("does not call onClick when disabled", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();
		render(
			<Button onClick={handleClick} disabled>
				Click me
			</Button>
		);

		const button = screen.getByRole("button");

		expect(button).toBeDisabled();

		await user.click(button);

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("shows active state when isActive is true", () => {
		render(<Button isActive>Active Button</Button>);

		const button = screen.getByRole("button");

		expect(button).toHaveClass("text-unifi-n06", "bg-unifi-n02");
	});

	it("renders icon when provided", () => {
		const icon = <span data-testid="icon">icon</span>;

		render(<Button icon={icon}>Search</Button>);

		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("applies correct variant classes", () => {
		const { rerender } = render(<Button variant="primary">Primary</Button>);

		expect(screen.getByRole("button")).toHaveClass("p-1.5", "rounded-sm");

		rerender(<Button variant="secondary">Secondary</Button>);

		expect(screen.getByRole("button")).toHaveClass(
			"p-1",
			"rounded-sm",
			"shadow-md"
		);

		rerender(<Button variant="text">Text</Button>);
		const button = screen.getByRole("button");

		expect(button).not.toHaveClass("p-1.5");
		expect(button).not.toHaveClass("p-1");
	});

	it("applies correct color classes", () => {
		const { rerender } = render(<Button color="primary">Primary</Button>);
		expect(screen.getByRole("button")).toHaveClass("text-unifi-n08");

		rerender(<Button color="cta">CTA</Button>);
		expect(screen.getByRole("button")).toHaveClass("text-unifi-n06");

		rerender(<Button color="error">Error</Button>);
		expect(screen.getByRole("button")).toHaveClass("text-unifi-r06");
	});

	it("applies disabled styling for error color when disabled", () => {
		render(
			<Button color="error" disabled>
				Error Disabled
			</Button>
		);

		expect(screen.getByRole("button")).toHaveClass("text-unifi-r03");
	});
});
