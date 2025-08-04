import React, { useState, useEffect } from "react";
import {
	Routes,
	Route,
	useLocation,
	Navigate,
	useNavigate,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const [menu, setMenu] = useState(false);
	const { isAuthenticated, loading, logout } = useAuth();
	const [watchlist, setWatchlist] = useState([]);
	const [form, setForm] = useState(false);
	const [coinData, setCoinData] = useState({});
	const [portfolio, setPortfolio] = useState({});
	const navigate = useNavigate();

	const handleLogout = () => {
		setWatchlist([]);
		setPortfolio({});
		logout();
		toast.success("Logged out successfully", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
		});
		navigate("/");
	};

	useEffect(() => {
		if (isAuthenticated) {
			loadUserData();
		} else {
			setWatchlist([]);
			setPortfolio({});
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
			toast.success("Portfolio updated successfully.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
			});
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
			toast.success("Portfolio updated successfully.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
			});
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

	async function toggleWatchlist(coinId, coinName = null) {
		try {
			if (!watchlist.includes(coinId)) {
				const response = await watchlistAPI.add(coinId);
				setWatchlist(response.watchlist);
				toast.success(`${coinName || "Coin"} was added to watchlist`, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
				});
			} else {
				const response = await watchlistAPI.remove(coinId);
				setWatchlist(response.watchlist);
				toast.info(`${coinName || "Coin"} was removed from watchlist`, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
				});
			}
		} catch (error) {
			console.error("Failed to update watchlist:", error);
			toast.error("Failed to update watchlist. Please try again.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
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
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
			<Header
				menu={menu}
				toggleMenu={toggleMenu}
				handleLogout={handleLogout}
			/>

			<AnimatePresence>
				{menu && <Menu handleLogout={handleLogout} />}
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
							<Login toggleForm={toggleForm} form={form} />
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
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
				theme="light"
			/>
		</div>
	);
};

export default App;
