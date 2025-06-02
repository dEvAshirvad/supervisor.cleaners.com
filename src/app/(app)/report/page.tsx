"use client";
import DashboardCards from "@/components/cards/dashboard-cards";
import ReportFilterForm from "@/components/forms/report-filter-form";
import EmployeeList from "@/components/list/employee-list";
import LocationReportList from "@/components/list/location-report-list";
import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

function Report() {
	const [refetch, setRefetch] = useState<boolean>(false);
	return (
		<>
			<PageHeader
				title="रिपोर्ट प्रबंधन (Reports Management)"
				description="स्टाफ और स्थान रिपोर्ट बनाएं और देखें (Generate and view staff and location reports)"
				updatedAt={new Date()}
				refetch={() => setRefetch(!refetch)}
			/>

			<DashboardCards title="रिपोर्ट फ़िल्टर (Report Filters)">
				<ReportFilterForm />
			</DashboardCards>
			<DashboardCards title="रिपोर्ट (Reports)">
				<EmployeeList refetch={refetch} />
			</DashboardCards>
		</>
	);
}

export default Report;
