import SearchIcon from "@mui/icons-material/Search";

export default function Searchbar({
	searchValue,
	setSearchValue,
	placeholder,
}) {
	return (
		<form className="flex w-full max-w-lg items-center mt-4">
			<div className="relative flex w-full items-center rounded-full border border-gray-300 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-600">
				<input
					type="text"
					placeholder={placeholder}
					className="w-full flex-grow bg-transparent p-3 pl-6 text-gray-800 placeholder-gray-400 focus:outline-none dark:text-gray-400 dark:placeholder-gray-400"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button
					className="rounded-full p-3 text-gray-500 transition-colors duration-200 hover:text-blue-600 focus:outline-none"
					type="button"
				>
					<SearchIcon />
				</button>
			</div>
		</form>
	);
}
