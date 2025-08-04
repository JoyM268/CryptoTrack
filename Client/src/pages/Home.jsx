import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Table from "../components/Table";
import Form from "../components/Form";
import LoginWarning from "../components/LoginWarning";
import CoinGeckoAttribution from "../components/CoinGeckoAttribution";
import { useAuth } from "../context/AuthContext";
import useTopCoins from "../hooks/useTopCoins";

const Home = ({
	watchlist,
	toggleWatchlist,
	addCoin,
	form,
	toggleForm,
	coinData,
}) => {
	const { isAuthenticated } = useAuth();
	const { coins, loading, error } = useTopCoins();
	const [search, setSearch] = useState("");

	const filteredCoins = coins.filter(
		(coin) =>
			coin.name.toLowerCase().includes(search.toLowerCase()) ||
			coin.symbol.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="p-4 pb-24 font-sans">
			{!form ? (
				<>
					<div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center mt-7 sm:mt-12 mb-12 gap-4">
						<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
							Track Cryptocurrency Prices
						</h1>
						<p className="text-md sm:text-lg text-gray-600">
							Stay updated with real-time cryptocurrency prices
							and track your portfolio.
						</p>
						<form className="flex w-full max-w-lg items-center mt-4">
							<div className="relative flex w-full items-center rounded-full border border-gray-300 bg-white shadow-sm ">
								<input
									type="text"
									placeholder="Search crypto.."
									className="w-full flex-grow bg-transparent p-3 pl-6 text-gray-800 placeholder-gray-400 focus:outline-none"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<button
									type="submit"
									className="rounded-full p-3 text-gray-500 transition-colors duration-200 hover:text-blue-600 focus:outline-none"
								>
									<SearchIcon />
								</button>
							</div>
						</form>
						<CoinGeckoAttribution />
					</div>

					<div className="w-full max-w-6xl mx-auto overflow-x-auto [scrollbar-width:none]">
						<Table
							loading={loading}
							error={error}
							coins={filteredCoins}
							toggleWatchlist={toggleWatchlist}
							watchlist={watchlist}
							message={""}
							toggleForm={toggleForm}
						/>
					</div>
				</>
			) : isAuthenticated ? (
				<Form
					title={"Add to Portfolio"}
					buttonText={"Add"}
					coinData={coinData}
					toggleForm={toggleForm}
					action={addCoin}
				/>
			) : (
				<LoginWarning toggleForm={toggleForm} />
			)}
		</div>
	);
};

export default Home;
