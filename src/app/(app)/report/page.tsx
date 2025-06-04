"use client";
import DashboardCards from "@/components/cards/dashboard-cards";
import ReportFilterForm from "@/components/forms/report-filter-form";

import ReportList from "@/components/list/report-list";
import PageHeader from "@/components/page-header";
import { useReport } from "@/hooks/useReport";
import React from "react";

function Report() {
	const { generateReport } = useReport();
	return (
		<>
			<PageHeader
				title="रिपोर्ट प्रबंधन (Reports Management)"
				description="स्टाफ और स्थान रिपोर्ट बनाएं और देखें (Generate and view staff and location reports)"
				refetch={() => {}}
			/>

			<DashboardCards title="रिपोर्ट फ़िल्टर (Report Filters)">
				<ReportFilterForm generateReport={generateReport} />
			</DashboardCards>

			<ReportList
				generateReportData={generateReport.data?.data}
				type={generateReport.data?.type}
			/>
		</>
	);
}

export default Report;
