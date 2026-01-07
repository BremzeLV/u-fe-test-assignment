import { Link } from "react-router";
import UbiquitiLogo from "./../../assets/logo.svg?react";

export function Header() {
	return (
		<header className="flex items-center justify-between shadow-md/25 text-unifi-t03 bg-unifi-n02 text-sm">
			<div className="flex items-center">
				<Link className="unifi-focus-visible" to="/">
					<div className="p-3.75 text-unifi-n10 hover:text-unifi-b06 hover:bg-unifi-n00">
						<UbiquitiLogo />
					</div>
				</Link>
				<span className="pl-4 pr-4">Devices</span>
			</div>

			<span className="pr-8">Everts Zeilins</span>
		</header>
	);
}
