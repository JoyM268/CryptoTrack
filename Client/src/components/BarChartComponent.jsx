import {
	Tooltip,
	Legend,
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
} from "recharts";
import { useCurrency } from "../context/CurrencyContext";

export default function BarChartComponent({ chart }) {
	const { currency, formatCurrency } = useCurrency();
	return (
		<ResponsiveContainer width="100%" minWidth={500} height="100%">
			<BarChart
				data={chart}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 40,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					angle={-45}
					textAnchor="end"
					interval={0}
					height={50}
				/>
				<YAxis
					tickFormatter={(value) =>
						new Intl.NumberFormat("en-US", {
							notation: "compact",
							compactDisplay: "short",
						}).format(value * currency[1])
					}
				/>
				<Tooltip
					cursor={{
						fill: "rgba(204, 204, 204, 0.2)",
					}}
					formatter={(value, name) => [
						formatCurrency(value * currency[1]),
						name,
					]}
				/>
				<Legend />
				<Bar
					dataKey="total"
					name="Total Investment"
					fill="#AF19FF"
					barSize={20}
				/>
				<Bar
					dataKey="value"
					name="Current Value"
					fill="#00C49F"
					barSize={20}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
