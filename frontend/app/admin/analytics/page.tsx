// app/admin/institute-analytics/page.tsx
"use client";
import Header from "@/components/admin/dashboard/Header";
import InstitutionSelector from "@/components/admin/institute-analytics/InstituteSelector";
import VolunteerDemographics from "@/components/admin/institute-analytics/VolunteerDemographics";
import ActivityAnalytics from "@/components/admin/institute-analytics/ActivityAnalytics";
import ImpactAnalytics from "@/components/admin/institute-analytics/ImpactAnalytics";
import React from "react";
import StatCards from "@/components/admin/institute-analytics/StatCard";

export default function InstituteAnalytics() {
	const [selectedInstitution, setSelectedInstitution] =
		React.useState<string>("ABC College");

	return (
		<div className="p-4">
			<Header title="Institute Analytics" />

			<StatCards />

			{/* Cross-Institution Charts */}
			<ActivityAnalytics />
			<ImpactAnalytics />

			{/* Selector for Institution-specific Analytics */}
			<InstitutionSelector onSelect={setSelectedInstitution} />

			{/* Institution-specific Charts */}
			{selectedInstitution && (
				<VolunteerDemographics institution={selectedInstitution} />
			)}
		</div>
	);
}