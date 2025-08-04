import { useState, useEffect } from "react";
import { FRANKFURTER_API } from "../constants";

export default function useCurrencyData() {
	const [currencyData, setCurrencyData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getCurrency() {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch(FRANKFURTER_API);

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

	return {
		currencyData,
		loading,
		error,
	};
}
