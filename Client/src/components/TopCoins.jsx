import { useState } from "react";
import Coin from "./Coin";

const TopCoins = ({ coins, loading, error, portfolio }) => {
	const [option, setOption] = useState("gainers");

	let gainers = [];
	let losers = [];

	if (
		coins &&
		portfolio &&
		coins.length > 0 &&
		Object.keys(portfolio).length > 0
	) {
		const portfolioWithProfit = Object.keys(portfolio)
			.map((coinId) => {
				const coinData = coins.find((c) => c.id === coinId);
				const portfolioData = portfolio[coinId];

				if (!coinData || !portfolioData) return null;

				const currentValue =
					coinData.current_price * portfolioData.coins;
				const totalInvestment = portfolioData.totalInvestment;

				const profit =
					totalInvestment > 0
						? ((currentValue - totalInvestment) / totalInvestment) *
						  100
						: 0;

				return { ...coinData, profit };
			})
			.filter(Boolean);

		gainers = [...portfolioWithProfit]
			.filter((ele) => ele.profit > 0)
			.sort((a, b) => b.profit - a.profit);
		losers = [...portfolioWithProfit]
			.filter((ele) => ele.profit < 0)
			.sort((a, b) => a.profit - b.profit);
	}

	return (
		<div className="bg-white shadow-lg rounded-xl pt-4 px-8 mt-8 dark:bg-gray-800">
			<div className="flex border-b border-b-gray-200 dark:border-b-gray-600">
				<div
					className={`p-4 cursor-pointer text-md font-semibold ${
						option === "gainers"
							? "border-b-2 border-b-blue-600 text-blue-600 dark:text-blue-400"
							: "text-gray-500 dark:text-white"
					}`}
					onClick={() => {
						if (option === "losers") setOption("gainers");
					}}
				>
					Top Gainers
				</div>
				<div
					className={`p-4 cursor-pointer text-md font-semibold ${
						option === "losers"
							? "border-b-2 border-b-blue-600 text-blue-600 dark:text-blue-400"
							: "text-gray-500 dark:text-white"
					}`}
					onClick={() => {
						if (option === "gainers") setOption("losers");
					}}
				>
					Top Losers
				</div>
			</div>
			<div className="mt-3 pb-4 overflow-y-scroll h-72 [scrollbar-width:none]">
				{loading && (
					<div className="text-center p-4 dark:text-white">
						Loading...
					</div>
				)}
				{error && (
					<div className="text-center p-4 text-red-500">
						Error fetching data.
					</div>
				)}

				{!loading && !error && (
					<>
						{option === "gainers" &&
							gainers.map((coin) => (
								<Coin
									key={coin.id}
									coin={coin}
									profit={coin.profit}
								/>
							))}

						{option === "losers" &&
							losers.map((coin) => (
								<Coin
									key={coin.id}
									coin={coin}
									profit={coin.profit}
								/>
							))}

						{gainers.length === 0 && option === "gainers" && (
							<div className="text-center p-4 text-gray-500 dark:text-white">
								No coins to display.
							</div>
						)}
						{losers.length === 0 && option === "losers" && (
							<div className="text-center p-4 text-gray-500 dark:text-white">
								No coins to display.
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default TopCoins;
