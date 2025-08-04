import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin(username, password, form, toggleForm ) {
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
			if (form) toggleForm();
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.error || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return { handleSubmit, loading, error };
}
