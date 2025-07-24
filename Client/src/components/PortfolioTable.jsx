import PortfolioCoinRow from "./PortfolioCoinRow";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CodeIcon from "@mui/icons-material/Code";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CoinGeckoAttribution from "./CoinGeckoAttribution";
import { NotoSans } from "./NotoSans-Regular.js";
import { NotoSansBold } from "./NotoSans-Bold.js";

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
			`Price(${currency[0]})`,
			`Investment(${currency[0]})`,
			"Coins Purchased",
			`Current Value(${currency[0]})`,
			`P/L Value(${currency[0]})`,
			"P/L %",
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
					coinData.current_price * currency[1],
					totalInvestment * currency[1],
					portfolioData.coins,
					currentValue * currency[1],
					profitValue * currency[1],
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
		link.setAttribute("download", "portfolio_report.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const downloadPDF = () => {
		if (
			!coins ||
			!portfolio ||
			coins.length === 0 ||
			Object.keys(portfolio).length === 0
		)
			return;

		const doc = new jsPDF();
		doc.addFileToVFS("NotoSans-Regular.ttf", NotoSans);
		doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
		doc.addFileToVFS("NotoSans-Bold.ttf", NotoSansBold);
		doc.addFont("NotoSans-Bold.ttf", "NotoSans", "bold");
		doc.setFont("NotoSans", "normal");

		const headers = [
			"Name",
			`Price(${currency[0]})`,
			`Investment(${currency[0]})`,
			"Coins Purchased",
			`Current Value(${currency[0]})`,
			`P/L Value(${currency[0]})`,
			"P/L %",
		];

		const profitLossValue = currentValue - totalInvestment;
		const profitLossPercentage = (profitLossValue / totalInvestment) * 100;

		doc.setFontSize(20);
		doc.setFont("NotoSans", "bold");
		doc.text(
			"Portfolio Details",
			doc.internal.pageSize.getWidth() / 2,
			20,
			{ align: "center" }
		);

		doc.setFont("NotoSans", "normal");
		doc.setFontSize(12);

		let startY = 35;
		doc.text(
			`Total Investment: ${formatCurrency(
				totalInvestment * currency[1]
			)}`,
			14,
			startY
		);
		startY += 8;
		doc.text(
			`Current Value: ${formatCurrency(currentValue * currency[1])}`,
			14,
			startY
		);
		startY += 8;
		doc.text(
			`Total Profit/Loss Value: ${formatCurrency(
				profitLossValue * currency[1]
			)}`,
			14,
			startY
		);
		startY += 8;
		doc.text(
			`Total Profit/Loss Percentage: ${profitLossPercentage.toFixed(2)}%`,
			14,
			startY
		);

		const rows = Object.keys(portfolio)
			.map((coinId) => {
				const coinData = coins.find((c) => c.id === coinId);
				const portfolioData = portfolio[coinId];

				if (!coinData || !portfolioData) return null;

				const value = coinData.current_price * portfolioData.coins;
				const investment = portfolioData.totalInvestment;
				const profitValue = value - investment;
				const profitPercentage = (profitValue / investment) * 100;

				return [
					coinData.name,
					coinData.current_price * currency[1],
					investment * currency[1],
					portfolioData.coins,
					value * currency[1],
					profitValue * currency[1],
					profitPercentage,
				];
			})
			.filter(Boolean);

		autoTable(doc, {
			head: [headers],
			body: rows.map((row) => {
				return row.map((cell) => {
					if (typeof cell === "number") {
						return cell.toFixed(2);
					}
					return cell;
				});
			}),
			startY: startY + 10,
			theme: "grid",
			styles: { font: "NotoSans", fontStyle: "normal" },
			headStyles: { fontStyle: "bold" },
		});

		let lastTableBottom = doc.lastAutoTable.finalY;

		const performers = Object.keys(portfolio)
			.map((coinId) => {
				const coinData = coins.find((c) => c.id === coinId);
				const portfolioData = portfolio[coinId];
				if (!coinData || !portfolioData) return null;

				const value = coinData.current_price * portfolioData.coins;
				const investment = portfolioData.totalInvestment;
				const profitValue = value - investment;
				const profitPercentage = (profitValue / investment) * 100 || 0;

				return {
					name: coinData.name,
					profit: profitValue,
					profitPercentage: profitPercentage,
				};
			})
			.filter(Boolean);

		const tableHeaders = ["Name", `P/L Value(${currency[0]})`, "P/L %"];

		const gainers = performers
			.filter((ele) => ele.profit > 0)
			.sort((a, b) => b.profit - a.profit);

		const losers = performers
			.filter((ele) => ele.profit < 0)
			.sort((a, b) => a.profit - b.profit);

		if (gainers.length > 0) {
			doc.setFontSize(16);
			doc.setFont("NotoSans", "bold");
			doc.text("Top Gainers", 14, lastTableBottom + 15);
			autoTable(doc, {
				head: [tableHeaders],
				body: gainers.map((g) => [
					g.name,
					formatCurrency(g.profit * currency[1]),
					`${g.profitPercentage.toFixed(2)}%`,
				]),
				startY: lastTableBottom + 20,
				theme: "grid",
				styles: { font: "NotoSans", fontStyle: "normal" },
				headStyles: { fontStyle: "bold" },
			});
			lastTableBottom = doc.lastAutoTable.finalY;
		}

		if (losers.length > 0) {
			doc.setFontSize(16);
			doc.setFont("NotoSans", "bold");
			doc.text("Top Losers", 14, lastTableBottom + 15);
			autoTable(doc, {
				head: [tableHeaders],
				body: losers.map((l) => [
					l.name,
					formatCurrency(l.profit * currency[1]),
					`${l.profitPercentage.toFixed(2)}%`,
				]),
				startY: lastTableBottom + 20,
				theme: "grid",
				styles: { font: "NotoSans", fontStyle: "normal" },
				headStyles: { fontStyle: "bold" },
			});
		}

		doc.save("portfolio_report.pdf");
	};

	return (
		<div className="relative">
			<div className="bg-white h-16 rounded-t-xl border border-gray-200 flex justify-between py-4 pl-4 sticky top-0 z-10">
				<div className="font-semibold text-sm sm:text-lg text-gray-800">
					Portfolio Details
				</div>
				<div className="flex items-center gap-4 pr-7">
					<div
						className="border border-gray-700 py-1 sm:py-2 text-xs sm:text-sm cursor-pointer rounded-md font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 px-1 sm:px-4"
						onClick={downloadPDF}
					>
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
									currency={currency}
								/>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PortfolioTable;
