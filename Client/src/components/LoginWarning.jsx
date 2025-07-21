import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

const LoginWarning = ({ toggleForm }) => {
	return (
		<div className="flex justify-center items-center ">
			<div className="bg-white p-6 shadow-md rounded-xl fixed top-1/4">
				<div className="flex justify-between gap-36">
					<h1 className="text-xl font-medium">Login Warning</h1>
					<div
						className="text-gray-600 hover:text-black cursor-pointer"
						onClick={toggleForm}
					>
						<CloseIcon />
					</div>
				</div>
				<p className="mt-4">
					<NavLink
						to="/login"
						className="text-blue-600 font-medium hover:text-blue-700"
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
