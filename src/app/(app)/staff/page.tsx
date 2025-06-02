"use client";
import EmployeeList from "@/components/list/employee-list";
import DashboardCards from "@/components/cards/dashboard-cards";
import AddStaffForm from "@/components/forms/add-staff-form";
import PageHeader from "@/components/page-header";
import React, { useState } from "react";

function StaffPage() {
	const [refetch, setRefetch] = useState<boolean>(false);
	return (
		<>
			<PageHeader
				title="कर्मचारी (Staff)"
				description="कर्मचारी की सूची"
				updatedAt={new Date()}
				refetch={() => setRefetch(!refetch)}
			/>
			<DashboardCards title="नया स्टाफ जोड़ें (Add New Staff)">
				<AddStaffForm refetch={() => setRefetch(!refetch)} />
			</DashboardCards>
			<DashboardCards
				title="स्टाफ सूची (Staff List)"
				onRefresh={() => setRefetch(!refetch)}>
				<EmployeeList refetch={refetch} />
			</DashboardCards>
		</>
	);
}

export default StaffPage;
