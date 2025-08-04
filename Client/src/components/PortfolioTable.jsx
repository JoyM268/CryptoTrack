import PortfolioCoinRow from "./PortfolioCoinRow";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CodeIcon from "@mui/icons-material/Code";
import { useCurrency } from "../context/CurrencyContext";
import downloadCSV from "../utils/downloadCSV.js";
import downloadPDF from "../utils/downloadPDF.js";

const PortfolioTable = ({
	loading,
	error,
	coins,
	toggleWatchlist,
	watchlist,
	portfolio,
	message,
	toggleForm,
	totalInvestment,
	currentValue,
}) => {
	const { currency, formatCurrency } = useCurrency();
	return (
		<div className="relative">
			<div className="bg-white h-16 rounded-t-xl border border-gray-200 flex justify-between py-4 pl-4 sticky top-0 z-10">
				<div className="font-semibold text-sm sm:text-lg text-gray-800">
					Portfolio Details
				</div>
				<div className="flex items-center gap-4 pr-7">
					<div
						className="border border-gray-700 py-1 sm:py-2 text-xs sm:text-sm cursor-pointer rounded-md font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 px-1 sm:px-4"
						onClick={() => {
							downloadPDF(
								coins,
								portfolio,
								currentValue,
								totalInvestment,
								currency,
								formatCurrency
							);
						}}
					>
						<PictureAsPdfIcon />
						<span className="ml-2">Export To PDF</span>
					</div>
					<div
						className="border border-gray-700 py-1 sm:py-2 text-xs sm:text-sm cursor-pointer rounded-md font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 px-1 sm:px-4"
						onClick={() => {
							downloadCSV(coins, portfolio, currency);
						}}
					>
						<CodeIcon />
						<span className="ml-2">Export To CSV</span>
					</div>
				</div>
			</div>
			<div className="overflow-x-auto [scrollbar-width:none]">
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
			</div>
		</div>
	);
};

export default PortfolioTable;
