import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import { AnimatePresence } from "motion/react";

const AppContent = () => {
	const [menu, setMenu] = useState(false);
	const loggedIn = true;
	const [watchlist, setWatchlist] = useState([]);
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
						/>
					}
				/>
				<Route
					path="/watchlist"
					element={
						<Watchlist
							watchlist={watchlist}
							toggleWatchlist={toggleWatchlist}
						/>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</div>
	);
};

const App = () => {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
};

export default App;
