import PortfolioCoinRow from "./PortfolioCoinRow";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CodeIcon from "@mui/icons-material/Code";

const PortfolioTable = ({
	loading,
	error,
	coins,
	toggleWatchlist,
	watchlist,
	portfolio,
	message,
	toggleForm,
}) => {
	const downloadCSV = () => {
		if (
			!coins ||
			!portfolio ||
			coins.length === 0 ||
			Object.keys(portfolio).length === 0
		) {
			return;
		}

		const headers = [
			"Name",
			"Price(USD)",
			"Total Investment(USD)",
			"Coins Purchased",
			"Current Value(USD)",
			"Profit/Loss Value(USD)",
			"Profit/Loss Percentage",
		];

		const rows = Object.keys(portfolio)
			.map((coinId) => {
				const coinData = coins.find((c) => c.id === coinId);
				const portfolioData = portfolio[coinId];

				if (!coinData || !portfolioData) return null;

				const currentValue =
					coinData.current_price * portfolioData.coins;
				const totalInvestment = portfolioData.totalInvestment;
				const profitValue = currentValue - totalInvestment;
				const profitPercentage = (profitValue / totalInvestment) * 100;

				return [
					coinData.name,
					coinData.current_price,
					totalInvestment,
					portfolioData.coins,
					currentValue,
					profitValue,
					profitPercentage,
				].join(",");
			})
			.filter(Boolean);

		const csvContent = [headers.join(","), ...rows].join("\n");
		const blob = new Blob([csvContent], {
			type: "text/csv;charset=utf-8;",
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("download", "portfolio.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<>
			<div className="bg-white h-16 rounded-t-xl border border-gray-200 flex justify-between py-4 pl-4">
				<div className="font-semibold text-sm sm:text-lg text-gray-800">
					Portfolio Details
				</div>
				<div className="flex items-center gap-4 pr-7">
					<div className="border border-gray-700 py-1 sm:py-2 text-xs sm:text-sm cursor-pointer rounded-md font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 px-1 sm:px-4">
						<PictureAsPdfIcon />
						<span className="ml-2">Export To PDF</span>
					</div>
					<div
						className="border border-gray-700 py-1 sm:py-2 text-xs sm:text-sm cursor-pointer rounded-md font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 px-1 sm:px-4"
						onClick={downloadCSV}
					>
						<CodeIcon />
						<span className="ml-2">Export To CSV</span>
					</div>
				</div>
			</div>
			<table className="w-full min-w-[760px] text-left">
				<thead className="bg-gray-50 border-b-2 border-gray-200">
					<tr>
						{[
							"Rank",
							"Name",
							"Price",
							"Total Investment",
							"Coins Purchased",
							"Current Value",
							"Profit/Loss",
							"",
						].map((header) => (
							<th
								key={header}
								className="px-6 py-3 text-left text-xs font-semibold text-gray-500 tracking-wider uppercase"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{message && (
						<tr>
							<td
								colSpan="8"
								className="text-center p-8 text-gray-500"
							>
								{message}
							</td>
						</tr>
					)}
					{loading && (
						<tr>
							<td
								colSpan="8"
								className="text-center p-8 text-gray-500"
							>
								Loading data...
							</td>
						</tr>
					)}
					{error && (
						<tr>
							<td
								colSpan="8"
								className="text-center p-8 text-red-500"
							>
								An Error Occured
							</td>
						</tr>
					)}
					{!loading &&
						!error &&
						coins.map((coin) => (
							<PortfolioCoinRow
								key={coin.id}
								coin={coin}
								coinData={portfolio[coin.id]}
								isStarred={watchlist.includes(coin.id)}
								toggleWatchlist={toggleWatchlist}
								toggleForm={toggleForm}
							/>
						))}
				</tbody>
			</table>
		</>
	);
};

export default PortfolioTable;
