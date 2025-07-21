import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const authAPI = {
	login: async (username, password) => {
		const response = await api.post("/login", { username, password });
		return response.data;
	},

	register: async (username, password) => {
		const response = await api.post("/register", { username, password });
		return response.data;
	},
};

export const portfolioAPI = {
	get: async () => {
		const response = await api.get("/portfolio");
		return response.data;
	},

	update: async (coin, coinData) => {
		const response = await api.put("/portfolio/update", { coin, coinData });
		return response.data;
	},
};

export const watchlistAPI = {
	get: async () => {
		const response = await api.get("/watchlist");
		return response.data;
	},

	add: async (coin) => {
		const response = await api.put("/watchlist/add", { coin });
		return response.data;
	},

	remove: async (coin) => {
		const response = await api.put("/watchlist/remove", { coin });
		return response.data;
	},
};

export default api;
