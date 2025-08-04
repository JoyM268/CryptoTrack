import { NotoSans } from "../constants/NotoSans-Regular.js";
import { NotoSansBold } from "../constants/NotoSans-Bold.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCurrency } from "../context/CurrencyContext.jsx";

export default function downloadPDF(
	coins,
	portfolio,
	currentValue,
	totalInvestment,
	currency,
	formatCurrency
) {
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
	doc.text("Portfolio Details", doc.internal.pageSize.getWidth() / 2, 20, {
		align: "center",
	});

	doc.setFont("NotoSans", "normal");
	doc.setFontSize(12);

	let startY = 35;
	doc.text(
		`Total Investment: ${formatCurrency(totalInvestment * currency[1], 6)}`,
		14,
		startY
	);
	startY += 8;
	doc.text(
		`Current Value: ${formatCurrency(currentValue * currency[1], 6)}`,
		14,
		startY
	);
	startY += 8;
	doc.text(
		`Total Profit/Loss Value: ${formatCurrency(
			profitLossValue * currency[1],
			6
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
				formatCurrency(g.profit * currency[1], 6),
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
				formatCurrency(l.profit * currency[1], 6),
				`${l.profitPercentage.toFixed(2)}%`,
			]),
			startY: lastTableBottom + 20,
			theme: "grid",
			styles: { font: "NotoSans", fontStyle: "normal" },
			headStyles: { fontStyle: "bold" },
		});
	}

	doc.save("portfolio_report.pdf");
}
