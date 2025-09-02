"use client";

import { useTheme } from "@/components/theme-provider";
import logoLight from "../../assets/logo-light.svg";
import logoDark from "../../assets/logo-dark.svg";

interface HeaderLogoProps {
	className?: string;
}

export default function HeaderLogo({ className }: HeaderLogoProps) {
	const { theme } = useTheme();

	return (
		<img
			src={theme === "dark" ? logoDark : logoLight}
			alt="Quick Heal"
			className={className}
		/>
	);
}