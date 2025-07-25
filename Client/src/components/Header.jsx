import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CurrencySelector from "./CurrencySelector";
import { useAuth } from "../context/AuthContext";

const Header = ({ menu, toggleMenu, handleLogout }) => {
	const { isAuthenticated } = useAuth();

	return (
		<div className="bg-white shadow-md h-16 flex justify-between items-center px-4 select-none z-20 sticky top-0">
			<NavLink to="/" className="text-2xl font-bold text-blue-700">
				CryptoTrack
			</NavLink>
			<ul className="hidden sm:flex items-center gap-4">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`rounded-sm px-3 py-2 text-sm font-medium ${
							isActive
								? "bg-blue-200 text-blue-700"
								: "text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
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
										? "bg-blue-200 text-blue-700"
										: "text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
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
										? "bg-blue-200 text-blue-700"
										: "text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
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
										? "bg-blue-200 text-blue-700"
										: "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
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
			</ul>
			<div className="flex gap-3 sm:hidden items-center ml-4">
				<CurrencySelector />
				<div
					className="sm:hidden hover:bg-blue-100 p-3 flex justify-center items-center rounded-3xl cursor-pointer"
					onClick={toggleMenu}
				>
					{menu ? (
						<CloseIcon sx={{ color: "black" }} fontSize="small" />
					) : (
						<MenuIcon sx={{ color: "black" }} fontSize="small" />
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
