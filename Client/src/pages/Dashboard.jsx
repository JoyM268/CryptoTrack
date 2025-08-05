import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useState } from "react";
import Form from "../components/Form";
import PortfolioTable from "../components/PortfolioTable";
import TopCoins from "../components/TopCoins";
import CoinGeckoAttribution from "../components/CoinGeckoAttribution";
import { useCurrency } from "../context/CurrencyContext";
import useCoins from "../hooks/useCoins";
import useChart from "../hooks/useChart";
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";

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
	const portfolioCoins = Object.keys(portfolio);
	const [action, setAction] = useState("");
	const { currency, formatCurrency } = useCurrency();
	const { coins, loading, error } = useCoins(portfolio);
	const chart = useChart(portfolio, coins);

	const handleToggleForm = (coin, actionType) => {
		setAction(actionType);
		toggleForm(coin);
	};

	const totalInvestment = Object.keys(portfolio).reduce((acc, coinId) => {
		return acc + portfolio[coinId].totalInvestment;
	}, 0);

	const currentValue = Object.keys(portfolio).reduce((acc, coinId) => {
		const coinData = coins.find((c) => c.id === coinId);
		if (coinData && portfolio[coinId]) {
			return acc + portfolio[coinId].coins * coinData.current_price;
		}
		return acc;
	}, 0);

	const profit =
		((currentValue - totalInvestment) / totalInvestment) * 100 || 0;

	return !form ? (
		<div className="bg-slate-100 min-h-screen w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-900 dark:text-white">
			<div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start gap-1 sm:gap-3 dark:bg-gray-800">
					<h2 className="text-md sm:text-xl font-semibold text-gray-500 dark:text-white">
						Current Value
					</h2>
					<p className="text-2xl sm:text-4xl font-bold wrap-anywhere">
						{formatCurrency(currentValue * currency[1])}
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
				<div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start gap-3 dark:bg-gray-800">
					<h2 className="text-md sm:text-xl font-semibold text-gray-500 dark:text-white">
						Total Investment
					</h2>
					<p className="text-2xl sm:text-4xl font-bold wrap-anywhere">
						{formatCurrency(totalInvestment * currency[1])}
					</p>
				</div>
			</div>
			<div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white shadow-lg rounded-xl p-6 mt-8 dark:bg-gray-800">
					<h2 className="text-xl font-semibold text-gray-500 mb-4 dark:text-white">
						Portfolio Allocation
					</h2>
					<div className="w-full h-80">
						{loading ? (
							<div className="flex justify-center items-center h-full">
								<p>Loading Chart...</p>
							</div>
						) : error ? (
							<div className="flex justify-center items-center h-full text-red-500">
								<p>{error}</p>
							</div>
						) : chart.length > 0 ? (
							<PieChartComponent chart={chart} />
						) : (
							<div className="flex justify-center items-center h-full">
								<p>No coins in portfolio to display.</p>
							</div>
						)}
					</div>
				</div>
				<TopCoins
					coins={coins}
					loading={loading}
					error={error}
					portfolio={portfolio}
				/>
			</div>
			<div className="bg-white shadow-lg rounded-xl p-6 mt-8 dark:bg-gray-800 ">
				<h2 className="text-xl font-semibold text-gray-500 mb-4 dark:text-white">
					Investment vs Current Value
				</h2>
				<div className="w-full h-96 overflow-x-auto ">
					{loading ? (
						<div className="flex justify-center items-center h-full">
							<p>Loading Chart...</p>
						</div>
					) : error ? (
						<div className="flex justify-center items-center h-full text-red-500">
							<p>{error}</p>
						</div>
					) : chart.length > 0 ? (
						<BarChartComponent chart={chart} />
					) : (
						<div className="flex justify-center items-center h-full">
							<p>No data to display in chart.</p>
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
					totalInvestment={totalInvestment}
					currentValue={currentValue}
				/>
				<div className="text-center mt-2">
					<CoinGeckoAttribution />
				</div>
			</div>
		</div>
	) : (
		<Form
			title={
				action == "add" ? "Add to Portfolio" : "Remove from Portfolio"
			}
			buttonText={action == "add" ? "Add" : "Remove"}
			coinData={coinData}
			toggleForm={toggleForm}
			action={action == "add" ? addCoin : removeCoin}
			portfolio={portfolio}
		/>
	);
};

export default Dashboard;
