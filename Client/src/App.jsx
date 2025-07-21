import React, { useState, useEffect } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import { AnimatePresence } from "motion/react";
import { useAuth } from "./context/AuthContext";
import { portfolioAPI, watchlistAPI } from "./services/api";

const AppContent = () => {
	const [menu, setMenu] = useState(false);
	const { isAuthenticated, loading } = useAuth();
	const [watchlist, setWatchlist] = useState([]);
	const [form, setForm] = useState(false);
	const [coinData, setCoinData] = useState({});
	const [portfolio, setPortfolio] = useState({});

	useEffect(() => {
		if (isAuthenticated) {
			loadUserData();
		}
	}, [isAuthenticated]);

	const loadUserData = async () => {
		try {
			const [portfolioData, watchlistData] = await Promise.all([
				portfolioAPI.get(),
				watchlistAPI.get(),
			]);
			setPortfolio(portfolioData);
			setWatchlist(watchlistData.watchlist);
		} catch (error) {
			console.error("Failed to load user data:", error);
		}
	};

	function toggleForm(coin = null) {
		if (coin) {
			setCoinData(coin);
		} else {
			setCoinData({});
		}
		setForm((form) => !form);
	}

	async function addCoin(id, totalInvestment, coins) {
		try {
			const coinData = {
				totalInvestment: parseFloat(totalInvestment),
				coins: parseFloat(coins),
			};
			const updatedPortfolio = await portfolioAPI.update(id, coinData);
			setPortfolio(updatedPortfolio);
			toggleForm();
		} catch (error) {
			console.error("Failed to add coin:", error);
		}
	}

	async function removeCoin(id, totalInvestment, coins) {
		try {
			const coinData = {
				totalInvestment: -parseFloat(totalInvestment),
				coins: -parseFloat(coins),
			};
			const updatedPortfolio = await portfolioAPI.update(id, coinData);
			setPortfolio(updatedPortfolio);
			toggleForm();
		} catch (error) {
			console.error("Failed to remove coin:", error);
		}
	}

	const location = useLocation();

	useEffect(() => {
		setMenu(false);
	}, [location]);

	function toggleMenu() {
		setMenu((menu) => !menu);
	}

	async function toggleWatchlist(coinId) {
		try {
			if (!watchlist.includes(coinId)) {
				const response = await watchlistAPI.add(coinId);
				setWatchlist(response.watchlist);
			} else {
				const response = await watchlistAPI.remove(coinId);
				setWatchlist(response.watchlist);
			}
		} catch (error) {
			console.error("Failed to update watchlist:", error);
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				Loading...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header
				menu={menu}
				toggleMenu={toggleMenu}
				loggedIn={isAuthenticated}
			/>
			<AnimatePresence>
				{menu && <Menu loggedIn={isAuthenticated} />}
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
							loggedIn={isAuthenticated}
						/>
					}
				/>
				<Route
					path="/dashboard"
					element={
						isAuthenticated ? (
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
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/watchlist"
					element={
						isAuthenticated ? (
							<Watchlist
								watchlist={watchlist}
								toggleForm={toggleForm}
								toggleWatchlist={toggleWatchlist}
								addCoin={addCoin}
								form={form}
								coinData={coinData}
							/>
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/login"
					element={
						isAuthenticated ? (
							<Navigate to="/dashboard" />
						) : (
							<Login />
						)
					}
				/>
				<Route
					path="/signup"
					element={
						isAuthenticated ? (
							<Navigate to="/dashboard" />
						) : (
							<SignUp />
						)
					}
				/>
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
