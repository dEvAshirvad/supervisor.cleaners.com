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
				title="सुपरवाइजर (Supervisor)"
				description="सुपरवाइजर की सूची"
				refetch={() => setRefetch(!refetch)}
			/>
			<DashboardCards title="नया सुपरवाइजर जोड़ें (Add New Supervisor)">
				<AddStaffForm refetch={() => setRefetch(!refetch)} />
			</DashboardCards>
			<DashboardCards
				title="सुपरवाइजर सूची (Supervisor List)"
				onRefresh={() => setRefetch(!refetch)}>
				<EmployeeList refetch={refetch} />
			</DashboardCards>
		</>
	);
}

export default StaffPage;
