import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await authAPI.login(username, password);
			login(response.token, response.user);
			toast.success("Login successful, Welcome back!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
			});
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.error || "Login failed");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="w-screen flex justify-center">
			<div className="flex flex-col mt-20 sm:mt-28 md:mt-32 justify-center items-center">
				<h1 className="text-3xl font-extrabold text-center">
					Login to your account
				</h1>
				<p className="mt-1 ">
					Or{" "}
					<NavLink
						to="/signup"
						className="no-underline text-blue-700 font-medium hover:text-blue-600 cursor-pointer"
					>
						create a new account
					</NavLink>
				</p>
				<form
					onSubmit={handleSubmit}
					className="mt-10 flex flex-col sm:min-w-sm min-w-4/5"
				>
					<div className="flex flex-col mb-4">
						<span className="text-s font-medium text-gray-800">
							Username
						</span>
						<input
							type="text"
							className="border py-2 pl-2.5 rounded-md"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex flex-col mb-4">
						<span className="text-s font-medium text-gray-800">
							Password
						</span>
						<input
							type="password"
							className="border py-2 pl-2.5 rounded-md"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && (
						<div className=" text-red-700 text-center">{error}</div>
					)}
					<button
						type="submit"
						disabled={loading}
						className="bg-blue-700 py-2 text-white rounded-3xl hover:bg-blue-600 cursor-pointer mt-2.5 disabled:opacity-50"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
