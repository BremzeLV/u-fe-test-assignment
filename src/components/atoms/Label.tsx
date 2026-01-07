interface LabelProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
	id?: string;
}

export function Label({ checked, onChange, label, id }: LabelProps) {
	return (
		<div className="group flex items-center rounded-sm px-1 focus-within:ring-1 focus-within:ring-unifi-n06">
			<input
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				id={id}
				type="checkbox"
				className="w-4 h-4 accent-unifi-n06 unifi-focus-visible group-hover:cursor-pointer"
			/>
			<label
				htmlFor={id}
				className="pl-2 text-sm text-unifi-t02 group-hover:cursor-pointer select-none"
			>
				{label}
			</label>
		</div>
	);
}
