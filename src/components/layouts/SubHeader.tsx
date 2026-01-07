import type React from "react";

type SubHeaderProps = {
	left: React.ReactNode;
	right: React.ReactNode;
};

export function SubHeader({ left, right }: SubHeaderProps) {
	return (
		<div className="flex-none md:flex items-center justify-between px-2 md:px-8 py-4 text-sm text-unifi-n08">
			{left}
			<div className="pt-2 md:pt-0">{right}</div>
		</div>
	);
}
