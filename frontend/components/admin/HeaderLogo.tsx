"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
interface HeaderLogoProps {
	className?: string;
}

export default function HeaderLogo({ className }: HeaderLogoProps) {
	const { theme } = useTheme();

	return (
		<Image
			src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
			alt="Quick Heal"
			width={120}
			height={40}
			className={className}
			priority
		/>
	);
}