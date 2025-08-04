import { useEffect, useState } from "react";
export default function useTheme() {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme") || "light";
	});

	useEffect(() => {
		localStorage.setItem("theme", theme);

		document.documentElement.classList.remove("dark", "light");

		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		}
	}, [theme]);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		if (savedTheme === "dark") {
			document.documentElement.classList.add("dark");
		}
	}, []);

	return {
		theme,
		setTheme,
	};
}
