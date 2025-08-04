import { useState, useEffect } from "react";
import { COINGECKO_TOP_COINS_API } from "../constants";

export default function useTopCoins() {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const topCoins = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(COINGECKO_TOP_COINS_API);
				if (!response.ok) {
					throw new Error("An Error Occured");
				}
				const data = await response.json();
				setCoins(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		topCoins();
	}, []);

	return { coins, loading, error };
}
