import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DefaultLayout } from "./components/layouts/DefaultLayout";
import { DevicesView } from "./components/layouts/DevicesView";
import { DeviceView } from "./components/layouts/DeviceView";
import { NotFound } from "./components/routes/NotFoundView";

import { DevicesProvider } from "./hooks/providers/DevicesProvider";
import { DeviceRoutesWithProviders } from "./components/routes/DeviceRoutesWithProviders";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route
							element={
								<DevicesProvider>
									<DeviceRoutesWithProviders />
								</DevicesProvider>
							}
						>
							<Route path="/" element={<DevicesView />} />
							<Route path="/device/:id" element={<DeviceView />} />
						</Route>

						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);
