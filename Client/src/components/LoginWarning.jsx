import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

const LoginWarning = ({ toggleForm }) => {
	return (
		<div className="flex justify-center items-center">
			<div className="bg-white p-6 shadow-md rounded-xl fixed top-1/3 mx-5 dark:bg-gray-800">
				<div className="flex justify-between gap-28">
					<h1 className="text-xl font-medium">Login Warning</h1>
					<div
						className="text-gray-600 hover:text-black cursor-pointer dark:text-gray-200"
						onClick={toggleForm}
					>
						<CloseIcon />
					</div>
				</div>
				<p className="mt-5">
					<NavLink
						to="/login"
						className="text-blue-600 font-medium hover:text-blue-700 dark:text-blue-400"
					>
						Login
					</NavLink>{" "}
					to add to watchlist or portfolio
				</p>
			</div>
		</div>
	);
};

export default LoginWarning;
