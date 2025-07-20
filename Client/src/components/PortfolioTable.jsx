import PortfolioCoinRow from "./PortfolioCoinRow";

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
	return (
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
	);
};

export default PortfolioTable;
