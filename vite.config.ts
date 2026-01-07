import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [
		tailwindcss(),
		svgr({
			include: "**/*.svg?react",
		}),
		react({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/test/setup.ts",
	},
});
