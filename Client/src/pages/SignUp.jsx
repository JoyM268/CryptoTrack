import { useState } from "react";
import { NavLink } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { handleSubmit, loading, error } = useSignUp(
		username,
		password,
		confirmPassword
	);

	return (
		<div className="w-screen flex justify-center">
			<div className="flex flex-col mt-16 sm:mt-20 md:mt-32 justify-center items-center">
				<h1 className="text-3xl font-extrabold text-center">
					Create a new account
				</h1>
				<p className="mt-1 ">
					Or{" "}
					<NavLink
						to="/login"
						className="no-underline text-blue-700 font-medium hover:text-blue-600 cursor-pointer dark:text-blue-400"
					>
						Login using existing account
					</NavLink>
				</p>
				<form
					onSubmit={handleSubmit}
					className="mt-10 flex flex-col sm:min-w-sm min-w-4/5"
				>
					<div className="flex flex-col mb-4">
						<span className="text-s font-medium text-gray-800 dark:text-gray-400">
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
						<span className="text-s font-medium text-gray-800 dark:text-gray-400">
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
					<div className="flex flex-col mb-4">
						<span className="text-s font-medium text-gray-800 dark:text-gray-400">
							Confirm Password
						</span>
						<input
							type="password"
							className="border py-2 pl-2.5 rounded-md"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
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
						{loading ? "Creating Account..." : "Sign Up"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
