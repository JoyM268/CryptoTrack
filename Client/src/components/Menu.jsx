import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

const Menu = ({ handleLogout }) => {
	const { isAuthenticated } = useAuth();

	return (
		<motion.ul
			initial={{ y: "-100%", opacity: 0.5 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: "-100%", opacity: 0.5 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="fixed bg-white w-screen shadow-md border-t sm:hidden flex-col text-center flex z-20 dark:bg-gray-800"
		>
			<NavLink
				to="/"
				className={({ isActive }) =>
					`p-2 w-full font-medium ${
						isActive
							? "bg-blue-200 text-blue-700 dark:bg-blue-800/50 dark:text-white"
							: "hover:bg-blue-50 text-gray-700 dark:hover:bg-blue-600/10 dark:text-white"
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
							`p-2 w-full font-medium ${
								isActive
									? "bg-blue-200 text-blue-700 dark:bg-blue-800/50 dark:text-white"
									: "hover:bg-blue-50 text-gray-700 dark:hover:bg-blue-600/10 dark:text-white"
							}`
						}
					>
						Dashboard
					</NavLink>
					<NavLink
						to="watchlist"
						className={({ isActive }) =>
							`p-2 w-full font-medium ${
								isActive
									? "bg-blue-200 text-blue-700 dark:bg-blue-800/50 dark:text-white"
									: "hover:bg-blue-50 text-gray-700 dark:hover:bg-blue-600/10 dark:text-white"
							}`
						}
					>
						Watchlist
					</NavLink>
					<button
						onClick={handleLogout}
						className="p-2 w-full text-white bg-blue-600 hover:bg-blue-700 font-medium"
					>
						Logout
					</button>
				</>
			) : (
				<>
					<NavLink
						to="login"
						className={({ isActive }) =>
							`p-2 w-full font-medium ${
								isActive
									? "bg-blue-200 text-blue-700 dark:bg-blue-800/50 dark:text-white"
									: "hover:bg-blue-50 text-gray-700 dark:hover:bg-blue-600/10 dark:text-white"
							}`
						}
					>
						Login
					</NavLink>
					<NavLink
						to="signup"
						className={({ isActive }) =>
							`p-2 w-full text-white font-medium ${
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
		</motion.ul>
	);
};

export default Menu;
