import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

import { useCurrency } from "../context/CurrencyContext";

const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#AF19FF",
	"#FF4560",
	"#775DD0",
	"#3F51B5",
	"#0AB39C",
	"#FABD22",
	"#F06543",
	"#D4526E",
];

export default function PieChartComponent({ chart }) {
	const { currency, formatCurrency } = useCurrency();
	return (
		<ResponsiveContainer>
			<PieChart>
				<Pie
					data={chart}
					cx="50%"
					cy="50%"
					labelLine={false}
					outerRadius={100}
					fill="#8884d8"
					dataKey="value"
					nameKey="name"
				>
					{chart.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
				<Tooltip
					formatter={(value) => formatCurrency(value * currency[1])}
				/>
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
