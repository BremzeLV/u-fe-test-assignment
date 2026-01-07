import { useState, useRef, useEffect } from "react";
import Search from "../../assets/search.svg?react";

interface SearchInputProps<T = unknown> {
	filteredItems: T[];
	searchQuery: string;
	onSearchChange: (query: string) => void;
	getName: (item: T) => string;
	getKey?: (item: T) => string | number;
}

export function SearchInput<T = unknown>({
	searchQuery,
	filteredItems,
	onSearchChange,
	getName,
	getKey,
}: SearchInputProps<T>) {
	const [localQuery, setLocalQuery] = useState(searchQuery);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setLocalQuery(searchQuery);
	}, [searchQuery]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target;
			if (
				dropdownRef.current &&
				target instanceof Node &&
				!dropdownRef.current.contains(target) &&
				inputRef.current &&
				!inputRef.current.contains(target)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setLocalQuery(value);
		onSearchChange(value);
		setIsOpen(value.trim().length > 0);
	};

	const handleClick = (name: string) => {
		setLocalQuery(name);
		onSearchChange(name);
		setIsOpen(false);
		inputRef.current?.blur();
	};

	return (
		<div className="relative">
			<div className="relative text-sm text-unifi-n08">
				<div className="pl-2">
					<Search className="absolute top-1/2 -translate-y-1/2 text-unifi-n08" />
				</div>
				<input
					ref={inputRef}
					type="text"
					value={localQuery}
					onChange={handleInputChange}
					onFocus={() => localQuery.trim() && setIsOpen(true)}
					placeholder="Search"
					className="h-8 pl-8 pr-2 bg-unifi-n03 border-0 rounded-sm focus:bg-background unifi-focus-visible"
				/>
			</div>

			{isOpen && filteredItems.length > 0 && (
				<div
					ref={dropdownRef}
					className="absolute w-full shadow-lg top-full left-0 bg-unifi-n00 rounded-sm z-50 overflow-y-auto"
				>
					{filteredItems.map((item, index) => {
						const name = getName(item);
						const key = getKey ? getKey(item) : index;
						return (
							<button
								key={key}
								onClick={() => handleClick(name)}
								className="w-full px-2 py-2 text-left text-sm flex items-center gap-3 unifi-focus-visible cursor-pointer hover:bg-unifi-n02"
							>
								<span className="truncate">{name}</span>
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
