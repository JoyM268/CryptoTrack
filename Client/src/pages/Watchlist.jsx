import Table from "../components/Table";
import Form from "../components/Form";
import CoinGeckoAttribution from "../components/CoinGeckoAttribution";
import useWatchlist from "../hooks/useWatchlist";

const Watchlist = ({
	watchlist,
	toggleWatchlist,
	addCoin,
	form,
	toggleForm,
	coinData,
}) => {
	const { coins, loading, error } = useWatchlist(watchlist);

	return !form ? (
		<>
			<div className="mt-3 overflow-x-auto [scrollbar-width:none] mx-6">
				<Table
					loading={loading}
					error={error}
					coins={coins}
					toggleWatchlist={toggleWatchlist}
					watchlist={watchlist}
					message={
						watchlist.length === 0
							? "No Coin Has Been Added To Watchlist"
							: ""
					}
					toggleForm={toggleForm}
				/>
			</div>
			<div className="text-center mt-1">
				<CoinGeckoAttribution />
			</div>
		</>
	) : (
		<Form
			title={"Add to Portfolio"}
			buttonText={"Add"}
			coinData={coinData}
			toggleForm={toggleForm}
			action={addCoin}
		/>
	);
};

export default Watchlist;
