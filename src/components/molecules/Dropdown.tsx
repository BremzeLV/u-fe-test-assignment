import React, { useEffect, useRef, useState } from "react";
import { Button } from "../atoms/Button";
import { twMerge } from "tailwind-merge";

type DropdownProps = {
	triggerText: string;
	isActive: boolean;
	children: React.ReactNode;
};

export function Dropdown({ triggerText, isActive, children }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [openToLeft, setOpenToLeft] = useState(false);

	const inputRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		if (inputRef.current) {
			const rect = inputRef.current.getBoundingClientRect();
			const dropdownWidth = dropdownRef?.current?.offsetWidth ?? 260;
			const spaceRight = window.innerWidth - rect.right;

			setOpenToLeft(spaceRight < dropdownWidth);
		}

		setIsOpen(true);
	};

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

	return (
		<div className="relative text-sm">
			<div ref={inputRef}>
				<Button
					isActive={isOpen || isActive}
					onClick={toggleDropdown}
					className="ml-2"
				>
					{triggerText}
				</Button>
			</div>

			{isOpen && (
				<div
					ref={dropdownRef}
					className={twMerge(
						"absolute top-full z-50 p-4 shadow-lg bg-unifi-n00 rounded-sm text-nowrap",
						openToLeft ? "right-0" : "left-0"
					)}
				>
					{children}
				</div>
			)}
		</div>
	);
}
