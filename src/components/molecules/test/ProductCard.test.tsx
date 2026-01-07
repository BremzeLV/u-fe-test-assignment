import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ProductCard } from "../ProductCard";

describe("ProductCard", () => {
	const defaultProps = {
		id: "device-1",
		title: "Access Point",
		subtitle: "WiFi 6",
		badge: "U6-Pro",
		imageUrl: "https://example.com/image.png",
	};

	it("renders product card", () => {
		render(
			<MemoryRouter>
				<ProductCard {...defaultProps} />
			</MemoryRouter>
		);

		expect(screen.getByText("Access Point")).toBeInTheDocument();
		expect(screen.getByText("WiFi 6")).toBeInTheDocument();
		expect(screen.getByText("U6-Pro")).toBeInTheDocument();

		const image = screen.getByAltText("access-point");
		expect(image).toHaveAttribute("src", "https://example.com/image.png");

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/device/device-1");
	});
});
