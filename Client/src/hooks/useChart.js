import { useState, useEffect } from "react";

export default function useChart(portfolio, coins) {
	const portfolioCoins = Object.keys(portfolio);
	const [chart, setChart] = useState([]);

	useEffect(() => {
		if (coins.length > 0 && portfolioCoins.length > 0) {
			const dataForChart = coins
				.map((coin) => {
					const portfolioCoin = portfolio[coin.id];
					if (!portfolioCoin) return null;
					return {
						name: coin.name,
						value: portfolioCoin.coins * coin.current_price,
						total: portfolioCoin.totalInvestment,
					};
				})
				.filter(Boolean);
			setChart(dataForChart);
		} else {
			setChart([]);
		}
	}, [coins, portfolio]);

	return chart;
}
