import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { CurrencyProvider } from "./context/CurrencyContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CurrencyProvider>
			<AuthProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</CurrencyProvider>
	</StrictMode>
);
