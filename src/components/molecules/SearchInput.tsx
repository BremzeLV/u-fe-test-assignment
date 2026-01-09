import { useState, useRef, useEffect } from "react";
import Search from "../../assets/search.svg?react";
import { twMerge } from "tailwind-merge";

interface SearchInputProps<T = unknown> {
	filteredItems: T[];
	searchQuery: string;
	className?: string;
	onSearchChange: (query: string) => void;
	getName: (item: T) => string;
	getSubtitle: (item: T) => string;
	getKey?: (item: T) => string | number;
}

export function SearchInput<T = unknown>({
	searchQuery,
	filteredItems,
	className,
	onSearchChange,
	getName,
	getSubtitle,
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

	const highlightRegex = new RegExp(`(${localQuery})`, "i");
	const itemProperties = (item: T, index: number) => {
		const name = getName(item);
		const nameParts = name.split(highlightRegex);

		return {
			name,
			subtitle: getSubtitle(item),
			key: getKey ? getKey(item) : index,
			displayName: nameParts.map((part, i) =>
				part.toLowerCase() === localQuery.toLowerCase() ? (
					// order will not change so safe to use index
					<span key={i} className="font-bold underline">
						{part}
					</span>
				) : (
					part
				)
			),
		};
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
					className={twMerge(
						"w-full h-8 pl-8 pr-2 bg-unifi-n03 border-0 rounded-sm focus:bg-background unifi-focus-visible",
						className
					)}
				/>
			</div>

			{isOpen && filteredItems.length > 0 && (
				<div
					ref={dropdownRef}
					className="absolute w-full shadow-lg top-full left-0 bg-unifi-n00 rounded-sm z-50 overflow-y-auto"
				>
					{filteredItems.map((item, index) => {
						const itemProps = itemProperties(item, index);

						return (
							<button
								key={itemProps.key}
								onClick={() => handleClick(itemProps.name)}
								className="flex-none md:flex items-center justify-between w-full px-2 py-2 text-left text-sm flex items-center gap-3 unifi-focus-visible cursor-pointer hover:bg-unifi-n02"
							>
								<div className="truncate text-unifi-n10">
									{itemProps.displayName}
								</div>

								<div className="text-unifi-t03">{itemProps.subtitle}</div>
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
