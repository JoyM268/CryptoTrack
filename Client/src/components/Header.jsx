import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CurrencySelector from "./CurrencySelector";
import { useAuth } from "../context/AuthContext";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useTheme from "../hooks/useTheme";

const Header = ({ menu, toggleMenu, handleLogout }) => {
	const { isAuthenticated } = useAuth();
	const { theme, setTheme } = useTheme();

	return (
		<div className="bg-white shadow-md h-16 flex justify-between items-center px-4 select-none z-40 sticky top-0 dark:bg-gray-800 dark:border-b dark:border-gray-800">
			<NavLink
				to="/"
				className="text-2xl font-bold text-blue-700 dark:text-blue-500"
			>
				CryptoTrack
			</NavLink>
			<ul className="hidden sm:flex items-center gap-4">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`rounded-sm px-3 py-2 text-sm font-medium ${
							isActive
								? "bg-blue-200 text-blue-700 dark:bg-blue-700/20 dark:text-gray-100"
								: "dark:text-gray-300 dark:hover:text-white dark:hover:bg-blue-500/1	0 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
						}`
					}
				>
					Home
				</NavLink>
				{isAuthenticated ? (
					<>
						<NavLink
							to="dashboard"
							className={({ isActive }) =>
								`rounded-sm px-3 py-2 text-sm font-medium ${
									isActive
										? "bg-blue-200 text-blue-700 dark:bg-blue-700/20 dark:text-gray-100"
										: "dark:text-gray-300 dark:hover:text-white dark:hover:bg-blue-500/10 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
								}`
							}
						>
							Dashboard
						</NavLink>
						<NavLink
							to="watchlist"
							className={({ isActive }) =>
								`rounded-sm px-3 py-2 text-sm font-medium ${
									isActive
										? "bg-blue-200 text-blue-700 dark:bg-blue-700/20 dark:text-gray-100"
										: "dark:text-gray-300 dark:hover:text-white dark:hover:bg-blue-500/10 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
								}`
							}
						>
							Watchlist
						</NavLink>

						<CurrencySelector />

						<button
							onClick={handleLogout}
							className="rounded-sm px-3 py-2 text-sm font-medium cursor-pointer text-white bg-blue-600 hover:bg-blue-700"
						>
							Logout
						</button>
					</>
				) : (
					<>
						<NavLink
							to="login"
							className={({ isActive }) =>
								`rounded-sm px-3 py-2 text-sm font-medium cursor-pointer ${
									isActive
										? "bg-blue-200 text-blue-700 dark:bg-blue-700/20 dark:text-gray-100"
										: "dark:text-gray-300 dark:hover:text-white dark:hover:bg-blue-500/10 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
								}`
							}
						>
							Login
						</NavLink>
						<CurrencySelector />
						<NavLink
							to="signup"
							className={({ isActive }) =>
								`rounded-sm px-3 py-2 text-sm font-medium cursor-pointer text-white ${
									isActive
										? "bg-blue-700"
										: "bg-blue-600 hover:bg-blue-700"
								}`
							}
						>
							Sign Up
						</NavLink>
					</>
				)}
				<div
					className={`flex justify-center items-center rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 dark:text-white dark:hover:bg-gray-900`}
					onClick={() => {
						theme === "light"
							? setTheme("dark")
							: setTheme("light");
					}}
				>
					{theme === "light" ? (
						<BrightnessMediumIcon sx={{ color: "#fcba03" }} />
					) : (
						<DarkModeIcon />
					)}
				</div>
			</ul>
			<div className="flex gap-3 sm:hidden items-center ml-4">
				<div
					className={`flex justify-center items-center rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 dark:text-white dark:hover:bg-gray-900`}
					onClick={() => {
						theme === "light"
							? setTheme("dark")
							: setTheme("light");
					}}
				>
					{theme === "light" ? (
						<BrightnessMediumIcon sx={{ color: "#fcba03" }} />
					) : (
						<DarkModeIcon />
					)}
				</div>
				<CurrencySelector />
				<div
					className="sm:hidden hover:bg-blue-100 p-3 flex justify-center items-center rounded-3xl cursor-pointer dark:text-white dark:hover:bg-blue-900/20"
					onClick={toggleMenu}
				>
					{menu ? (
						<CloseIcon fontSize="small" />
					) : (
						<MenuIcon fontSize="small" />
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
