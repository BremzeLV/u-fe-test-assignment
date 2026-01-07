import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "text";
type ButtonColor = "primary" | "cta" | "error";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	isActive?: boolean;
	variant?: ButtonVariant;
	color?: ButtonColor;
	icon?: React.ReactNode;
	children?: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Button({
	isActive,
	variant = "primary",
	color = "primary",
	icon,
	disabled,
	children,
	...props
}: ButtonProps) {
	const buttonVariant: Record<ButtonVariant, string> = {
		primary: "p-1.5 rounded-sm",
		secondary: "p-1 rounded-sm shadow-md bg-unifi-n00",
		text: "",
	};

	const buttonColor: Record<ButtonColor, string> = {
		primary: "text-unifi-n08",
		cta: "rounded-sm text-unifi-n06 hover:text-unifi-n07",
		error: !disabled ? "text-unifi-r06" : "text-unifi-r03",
	};

	const active = [
		isActive ? "text-unifi-n06 bg-unifi-n02" : "",
		!isActive && variant !== "text" && !disabled
			? "hover:bg-unifi-n02 focus:bg-unifi-n00 focus:hover:bg-unifi-n02"
			: "",
	];

	const buttonClasses = twMerge(
		"flex items-center",
		disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer",
		buttonColor[color],
		buttonVariant[variant],
		...active
	);

	return (
		<button {...props} disabled={disabled} className={buttonClasses}>
			{icon && <div className="inline-block">{icon} </div>}
			{children}
		</button>
	);
}
