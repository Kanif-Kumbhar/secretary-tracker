import { ModeToggle } from "@/components/ui/ModeToggle";
import { Notifications } from "./Notifications";

interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return (
		<header className="flex items-center justify-between p-6 bg-gray-900">
			<h2 className="text-2xl font-bold text-white">{title}</h2>

			<div className="flex items-center space-x-4">
				<ModeToggle />
				<Notifications />
			</div>
		</header>
	);
}