import { COINGECKO_URL } from "../constants";
const CoinGeckoAttribution = () => {
	return (
		<div className="text-xs text-gray-600 dark:text-gray-400">
			Data provided by{" "}
			<a
				className="text-blue-600 underline hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600"
				href={COINGECKO_URL}
			>
				CoinGecko
			</a>
		</div>
	);
};

export default CoinGeckoAttribution;
