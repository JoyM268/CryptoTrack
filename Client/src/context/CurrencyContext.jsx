import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	Children,
} from "react";

const CurrencyContext = createContext();

export const useCurrency = () => {
	const context = useContext(CurrencyContext);
	if (!context) {
		throw new Error(
			"useCurrency can only be used within an CurrencyProvider"
		);
	}

	return context;
};

export const CurrencyProvider = ({ children }) => {
	const [currency, setCurrency] = useState(["USD", 1]);

	const formatCurrency = (value, max = 2) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency[0],
			minimumFractionDigits: 0,
			maximumFractionDigits: max,
		}).format(value);
	};

	return (
		<CurrencyContext.Provider
			value={{ currency, formatCurrency, setCurrency }}
		>
			{children}
		</CurrencyContext.Provider>
	);
};
