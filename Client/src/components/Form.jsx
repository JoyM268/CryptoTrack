import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
const Form = ({
	title,
	buttonText,
	coinData,
	toggleForm,
	action,
	portfolio,
}) => {
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(coinData.current_price);
	const isSelling = buttonText === "Sell";
	const [warning, setWarning] = useState(null);
	return (
		<div className="flex w-screen justify-center items-center">
			<div className="fixed top-1/5 w-fit shadow-2xl p-8 rounded-xl bg-white mx-6">
				<div className="flex justify-between gap-36 mb-4">
					<h1 className="text-xl font-bold">{title}</h1>
					<div
						className="text-gray-600 hover:text-black cursor-pointer"
						onClick={toggleForm}
					>
						<CloseIcon />
					</div>
				</div>
				<div className="flex items-center gap-4">
					<img
						src={coinData.image}
						alt={coinData.name}
						className="w-12 rounded-full"
					/>
					<div className="flex flex-col">
						<h2 className="font-medium">{coinData.name}</h2>
						<p className="uppercase text-xs">{coinData.symbol}</p>
						<p className="text-xs">
							Price: ${coinData.current_price?.toLocaleString()}
						</p>
					</div>
				</div>
				<form className="my-6">
					<div className="flex flex-col mb-3">
						<span>Amount *</span>
						<input
							type="text"
							value={amount}
							onChange={(e) => {
								if (warning) {
									setWarning(null);
								}
								setAmount(e.target.value);
							}}
							className="border px-2 py-2.5 rounded-md"
							placeholder="Amount"
						/>
					</div>
					<div className="flex flex-col mb-5">
						<span>
							{isSelling
								? "Sell Price(USD) *"
								: "Buy Price(USD) *"}
						</span>
						<input
							type="text"
							value={price}
							onChange={(e) => {
								if (warning) {
									setWarning(null);
								}
								setPrice(e.target.value);
							}}
							className="border px-2 py-2.5 rounded-md"
							placeholder="Price"
						/>
					</div>
					<p className="text-wrap text-center">
						{Number.isNaN(amount * price) ? (
							<span className="text-red-500 text-center">
								Amount And Price can only be a Number
							</span>
						) : !warning ? (
							`${
								isSelling
									? "Total Sale Value"
									: "Total Investment"
							}: \$${(amount * price).toFixed(2)}`
						) : (
							<span className="text-red-500 text-center">
								{warning}
							</span>
						)}
					</p>
				</form>
				<button
					className="bg-blue-600 w-full text-white py-3 rounded-md hover:bg-blue-700 cursor-pointer"
					onClick={() => {
						const coins = portfolio[coinData.id]?.coins || 0;
						const totalInvestment =
							portfolio[coinData.id]?.totalInvestment || 0;

						if (isSelling && amount > coins) {
							setWarning(
								`Amount exceeds your owned ${coinData.name}.`
							);
							return;
						}

						if (isSelling && amount * price > totalInvestment) {
							setWarning(
								`Sale Value exceeds your owned Balance.`
							);
							return;
						}

						action(coinData.id, amount * price, amount);
					}}
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
};

export default Form;
