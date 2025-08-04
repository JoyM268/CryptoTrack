import { useCurrency } from "../context/CurrencyContext";
import useCurrencyData from "../hooks/useCurrencyData";

const CurrencySelector = () => {
	const { currency, setCurrency } = useCurrency();
	const { currencyData, loading, error } = useCurrencyData();

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
