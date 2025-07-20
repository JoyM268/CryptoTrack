import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useState, useEffect } from "react";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import Form from "../components/Form";
import PortfolioTable from "../components/PortfolioTable";

const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#AF19FF",
	"#FF1943",
];

const Dashboard = ({
	watchlist,
	toggleWatchlist,
	portfolio,
	form,
	addCoin,
	toggleForm,
	removeCoin,
	coinData,
}) => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [action, setAction] = useState("");
	const [pieChart, setPieChart] = useState([]);
	const portfolioCoins = Object.keys(portfolio);

	const handleToggleForm = (coin, actionType) => {
		setAction(actionType);
		toggleForm(coin);
	};

	useEffect(() => {
		const searchCoins = async () => {
			setLoading(true);
			setError(null);

			if (portfolioCoins.length === 0) {
				setCoins([]);
				setLoading(false);
				return;
			}

			try {
				const coinIds = portfolioCoins.join(",");
				const res = await fetch(
					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=false`
				);
				if (!res.ok) throw new Error("An error occured");
				const data = await res.json();
				setCoins(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		searchCoins();
	}, [portfolio]);

	useEffect(() => {
		if (coins.length > 0 && portfolioCoins.length > 0) {
			const dataForPieChart = coins.map((coin) => {
				const portfolioCoin = portfolio[coin.id];
				return {
					name: coin.name,
					value: portfolioCoin.coins * coin.current_price,
				};
			});
			setPieChart(dataForPieChart);
		} else {
			setPieChart([]);
		}
	}, [coins, portfolio]);

	const totalInvestment = Object.keys(portfolio).reduce((acc, coinId) => {
		return acc + portfolio[coinId].totalInvestment;
	}, 0);

	const currentValue = Object.keys(portfolio).reduce((acc, coinId) => {
		const coinData = coins.find((c) => c.id === coinId);
		if (coinData) {
			return acc + portfolio[coinId].coins * coinData.current_price;
		}
		return acc;
	}, 0);

	const profit = ((currentValue - totalInvestment) / totalInvestment) * 100;

	return !form ? (
		<div className="bg-slate-100 min-h-screen w-full p-4 sm:p-6 lg:p-8">
			<div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start gap-3">
					<h2 className="text-xl font-semibold text-gray-500">
						Current Value
					</h2>
					<p className="text-4xl font-bold">
						${currentValue.toFixed(2)}
					</p>
					<div
						className={`flex items-center gap-2 font-semibold ${
							profit < 0 ? "text-red-600" : "text-green-600"
						}`}
					>
						{profit < 0 ? <TrendingDownIcon /> : <TrendingUpIcon />}
						<span>{profit.toFixed(2)}%</span>
					</div>
				</div>
				<div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start gap-3">
					<h2 className="text-xl font-semibold text-gray-500">
						Total Investment
					</h2>
					<p className="text-4xl font-bold">
						${totalInvestment.toFixed(2).toString()}
					</p>
				</div>
			</div>
			<div className="bg-white shadow-lg rounded-xl p-6 mt-8">
				<h2 className="text-xl font-semibold text-gray-500 mb-4">
					Portfolio Allocation
				</h2>
				<div style={{ width: "100%", height: 300 }}>
					{loading ? (
						<div className="flex justify-center items-center h-full">
							<p>Loading Chart...</p>
						</div>
					) : error ? (
						<div className="flex justify-center items-center h-full text-red-500">
							<p>{error}</p>
						</div>
					) : pieChart.length > 0 ? (
						<ResponsiveContainer>
							<PieChart>
								<Pie
									data={pieChart}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									nameKey="name"
								>
									{pieChart.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip
									formatter={(value) =>
										`$${value.toFixed(2)}`
									}
								/>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					) : (
						<div className="flex justify-center items-center h-full">
							<p>No coins in portfolio to display.</p>
						</div>
					)}
				</div>
			</div>
			<div className="mt-10 mx-auto overflow-x-auto [scrollbar-width:none]">
				<PortfolioTable
					loading={loading}
					error={error}
					coins={coins}
					toggleWatchlist={toggleWatchlist}
					watchlist={watchlist}
					portfolio={portfolio}
					message={
						portfolioCoins.length !== 0
							? ""
							: "No Coins Added To Portfolio"
					}
					toggleForm={handleToggleForm}
				/>
			</div>
		</div>
	) : (
		<Form
			title={
				action == "add" ? "Add to Portfolio" : "Remove from Portfolio"
			}
			buttonText={action == "add" ? "Buy" : "Sell"}
			coinData={coinData}
			toggleForm={toggleForm}
			action={action == "add" ? addCoin : removeCoin}
		/>
	);
};

export default Dashboard;
