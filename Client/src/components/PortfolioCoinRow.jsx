import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { useCurrency } from "../context/CurrencyContext";
import getColor from "../utils/color";

const PortfolioCoinRow = ({
	coin,
	isStarred,
	coinData,
	toggleWatchlist,
	toggleForm,
}) => {
	const { currency, formatCurrency } = useCurrency();

	if (!coinData) {
		return <></>;
	}

	const profit =
		((coin.current_price * coinData.coins - coinData.totalInvestment) /
			coinData.totalInvestment) *
		100;
	const color = getColor(profit);

	return (
		<tr className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-150 dark:hover:bg-gray-900 dark:border-gray-700">
			<td className="px-6 py-4 text-center font-medium text-gray-700 dark:text-white">
				{coin.market_cap_rank}
			</td>
			<td className="px-6 py-4">
				<div className="flex items-center gap-3">
					<img
						src={coin.image}
						alt={coin.name}
						className="w-8 rounded-full"
					/>
					<div>
						<p className="font-semibold text-gray-900 dark:text-white">
							{coin.name}
						</p>
						<p className="text-gray-500 text-sm uppercase dark:text-gray-400">
							{coin.symbol}
						</p>
					</div>
				</div>
			</td>
			<td className="px-6 py-4 font-medium">
				{formatCurrency(coin.current_price * currency[1], 6)}
			</td>
			<td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
				{formatCurrency(
					(coinData.totalInvestment * currency[1]).toFixed(2),
					6
				)}
			</td>
			<td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
				{coinData.coins.toLocaleString()}
			</td>
			<td className={`px-6 py-4 font-medium`}>
				{formatCurrency(
					(coin.current_price * coinData.coins * currency[1]).toFixed(
						2
					),
					6
				)}
			</td>

			<td className={`px-6 py-4 font-medium ${color}`}>
				{profit.toFixed(2).toLocaleString()}%
			</td>
			<td className="px-6 py-4">
				<div className="flex items-center gap-2">
					<button
						className={`cursor-pointer ${
							!isStarred
								? "text-gray-400 hover:text-amber-300 transition-all duration-200"
								: "text-amber-300"
						}`}
						onClick={() => {
							toggleWatchlist(coin.id, coin.name);
						}}
					>
						{isStarred ? <StarIcon /> : <StarOutlineIcon />}
					</button>
					<button
						className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-all duration-200 cursor-pointer"
						onClick={() => {
							toggleForm(coin, "add");
						}}
					>
						Add
					</button>
					<button
						className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-all duration-200 cursor-pointer"
						onClick={() => {
							toggleForm(coin, "remove");
						}}
					>
						Remove
					</button>
				</div>
			</td>
		</tr>
	);
};

export default PortfolioCoinRow;
