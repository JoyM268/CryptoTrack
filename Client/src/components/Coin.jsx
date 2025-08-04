const Coin = ({ coin, profit }) => {
	return (
		<div className="flex justify-between items-center px-2 py-3 border-b border-gray-100 last:border-b-0 dark:border-gray-600">
			<div className="flex gap-3 items-center">
				<img
					src={coin.image}
					alt={coin.name}
					className="w-8 h-8 rounded-full"
				/>
				<div>
					<div className="font-semibold">{coin.name}</div>
					<div className="text-gray-500 text-sm uppercase dark:text-gray-300">
						{coin.symbol}
					</div>
				</div>
			</div>
			<div
				className={`font-semibold ${
					profit >= 0 ? "text-green-600" : "text-red-600"
				}`}
			>
				{profit >= 0 ? "+" : ""}
				{profit.toFixed(2)}%
			</div>
		</div>
	);
};

export default Coin;
