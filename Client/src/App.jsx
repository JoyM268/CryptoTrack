import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import { AnimatePresence } from "motion/react";

const App = () => {
	const [menu, setMenu] = useState(false);
	const loggedIn = true;
	const [watchlist, setWatchlist] = useState([]);
	const [form, setForm] = useState(false);
	const [coinData, setCoinData] = useState({});
	const [portfolio, setPortfolio] = useState({
		bitcoin: {
			totalInvestment: 5500,
			coins: 4,
		},

		ethereum: {
			totalInvestment: 403000,
			coins: 100,
		},
	});

	function toggleForm(coin = null) {
		if (coin) {
			setCoinData(coin);
		} else {
			setCoinData({});
		}
		setForm((form) => !form);
	}

	function addCoin(id, totalInvestment, coins) {
		setPortfolio((prev) => ({
			...prev,
			[id]: {
				totalInvestment:
					(prev[id]?.totalInvestment || 0) +
					parseFloat(totalInvestment),
				coins: (prev[id]?.coins || 0) + parseFloat(coins),
			},
		}));
		toggleForm();
	}

	function removeCoin(id, totalInvestment, coins) {
		setPortfolio((prev) => ({
			...prev,
			[id]: {
				totalInvestment:
					(prev[id]?.totalInvestment || 0) -
					parseFloat(totalInvestment),
				coins: (prev[id]?.coins || 0) - parseFloat(coins),
			},
		}));
		toggleForm();
	}

	const location = useLocation();

	useEffect(() => {
		setMenu(false);
	}, [location]);

	function toggleMenu() {
		setMenu((menu) => !menu);
	}

	function toggleWatchlist(coinId) {
		if (!watchlist.includes(coinId)) {
			setWatchlist([...watchlist, coinId]);
		} else {
			const newWatchlist = watchlist.filter((ele) => ele != coinId);
			setWatchlist(newWatchlist);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header menu={menu} toggleMenu={toggleMenu} loggedIn={loggedIn} />
			<AnimatePresence>
				{menu && <Menu loggedIn={loggedIn} />}
			</AnimatePresence>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							watchlist={watchlist}
							toggleWatchlist={toggleWatchlist}
							addCoin={addCoin}
							form={form}
							toggleForm={toggleForm}
							coinData={coinData}
						/>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<Dashboard
							watchlist={watchlist}
							toggleWatchlist={toggleWatchlist}
							portfolio={portfolio}
							addCoin={addCoin}
							form={form}
							toggleForm={toggleForm}
							coinData={coinData}
							removeCoin={removeCoin}
						/>
					}
				/>
				<Route
					path="/watchlist"
					element={
						<Watchlist
							watchlist={watchlist}
							toggleForm={toggleForm}
							toggleWatchlist={toggleWatchlist}
							addCoin={addCoin}
							form={form}
							coinData={coinData}
						/>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</div>
	);
};

export default App;
