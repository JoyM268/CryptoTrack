import { useEffect, useState } from "react";
import Table from "../components/Table";
import Form from "../components/Form";

const Watchlist = ({
	watchlist,
	toggleWatchlist,
	addCoin,
	form,
	toggleForm,
	coinData,
	loggedIn,
}) => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const searchCoins = async (query) => {
			setLoading(true);
			setError(null);

			if (watchlist.length === 0) {
				setCoins([]);
				setLoading(false);
				return;
			}

			try {
				const coinIds = watchlist.join(",");
				const res = await fetch(
					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=false`
				);
				if (!res.ok) throw new Error("An error occured");
				const data = await res.json();
				setCoins(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		searchCoins();
	}, [watchlist]);

	return;

	{
		!form ? (
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
					loggedIn={loggedIn}
				/>
			</div>
		) : (
			<Form
				title={"Add to Portfolio"}
				buttonText={"Add"}
				coinData={coinData}
				toggleForm={toggleForm}
				action={addCoin}
			/>
		);
	}
};

export default Watchlist;
