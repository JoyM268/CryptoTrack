import { useState } from "react";
import Table from "../components/Table";
import Form from "../components/Form";
import LoginWarning from "../components/LoginWarning";
import CoinGeckoAttribution from "../components/CoinGeckoAttribution";
import { useAuth } from "../context/AuthContext";
import useTopCoins from "../hooks/useTopCoins";
import Searchbar from "../components/Searchbar";

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
		<>
			{!form ? (
				<div className="p-4 pb-24 font-sans ">
					<div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center mt-7 sm:mt-12 mb-12 gap-4">
						<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
							Track Cryptocurrency Prices
						</h1>
						<p className="text-md sm:text-lg text-gray-600 dark:text-gray-400">
							Stay updated with real-time cryptocurrency prices
							and track your portfolio.
						</p>
						<Searchbar
							searchValue={search}
							setSearchValue={setSearch}
							placeholder="Search crypto.."
						/>
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
				</div>
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
		</>
	);
};

export default Home;
