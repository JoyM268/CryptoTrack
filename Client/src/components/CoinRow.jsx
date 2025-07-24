import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

const CoinRow = ({
	coin,
	isStarred,
	toggleWatchlist,
	toggleForm,
	loggedIn,
	currency,
}) => {
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency[0],
			minimumFractionDigits: 0,
			maximumFractionDigits: 6,
		}).format(value);
	};

	const color =
		coin.price_change_percentage_24h < 0
			? "text-red-600"
			: "text-green-600";

	return (
		<tr className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-150">
			<td className="px-6 py-4 text-center font-medium text-gray-700">
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
						<p className="font-semibold text-gray-900">
							{coin.name}
						</p>
						<p className="text-gray-500 text-sm uppercase">
							{coin.symbol}
						</p>
					</div>
				</div>
			</td>
			<td className="px-6 py-4 font-medium">
				{formatCurrency(coin.current_price * currency[1])}
			</td>
			<td className={`px-6 py-4 font-medium ${color}`}>
				{coin.price_change_percentage_24h.toFixed(2)}%
			</td>
			<td className="px-6 py-4 font-medium text-gray-800">
				{formatCurrency((coin.market_cap * currency[1]).toFixed(2))}
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
							if (loggedIn) {
								toggleWatchlist(coin.id, coin.name);
							} else {
								toggleForm();
							}
						}}
					>
						{isStarred ? <StarIcon /> : <StarOutlineIcon />}
					</button>
					<button
						className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-all duration-200 cursor-pointer"
						onClick={() => {
							toggleForm(coin);
						}}
					>
						Add
					</button>
				</div>
			</td>
		</tr>
	);
};

export default CoinRow;
