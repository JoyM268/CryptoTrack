import { useState, useEffect } from "react";
import { useCurrency } from "../context/CurrencyContext";

const CurrencySelector = () => {
	const { currency, setCurrency } = useCurrency();
	const [currencyData, setCurrencyData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getCurrency() {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch(
					"https://api.frankfurter.app/latest?from=USD"
				);

				const data = await res.json();
				if (!res.ok) {
					throw new Error("An Error Occured");
				}
				setCurrencyData(data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		}

		getCurrency();
	}, []);

	return (
		<select
			className="bg-white border border-gray-300 text-sm text-gray-600 font-semibold py-1.5 px-3 rounded-md shadow-sm cursor-pointer focus:outline-none"
			value={currency[0]}
			onChange={(e) =>
				setCurrency([
					e.target.value,
					currencyData.rates[e.target.value] || 1,
				])
			}
		>
			{loading && <option>Loading</option>}

			{error && <option>Error</option>}

			{!loading && !error && (
				<>
					<option key={"USD"}>USD</option>
					{Object.keys(currencyData.rates || {}).map(
						(currencyName) => (
							<option key={currencyName}>{currencyName}</option>
						)
					)}
				</>
			)}
		</select>
	);
};

export default CurrencySelector;
