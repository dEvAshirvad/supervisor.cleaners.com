"use client";

import { authClient } from "@/lib/auth-client";
import { ArchiveX } from "lucide-react";
import React, { useEffect, useState } from "react";

function EmployeeRankingList() {
	const [employees, setEmployees] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchEmployees = async () => {
			const users = await authClient.admin.listUsers({
				query: {
					filterField: "role",
					filterOperator: "eq",
					filterValue: "supervisor",
				},
			});
			setEmployees(users.data?.users || []);
		};
		fetchEmployees();
	}, []);
	return (
		<div>
			<div className="h-12 rounded-lg px-10 grid grid-cols-4 bg-accent mb-4">
				<p className="text-sm font-bold flex items-center">Rank</p>
				<p className="text-sm font-bold flex items-center">Name</p>
				<p className="text-sm font-bold flex items-center">Assigned Ward</p>
				<p className="text-sm font-bold flex items-center">Tasks</p>
			</div>
			{employees.length > 0 ? (
				employees.map((employee, index) => (
					<div
						key={index}
						className="h-12 rounded-lg px-10 grid grid-cols-4 even:bg-orange-100">
						<p className="text-sm flex font-semibold items-center">
							# {index + 1}
						</p>
						<p className="text-sm font-semibold flex items-center">
							{employee.name}
						</p>
						<p className="text-sm flex items-center capitalize">
							{employee.assignedWard}
						</p>
						<p className="text-sm flex items-center">
							{employee.completedTasks}
						</p>
						{/* <p className="text-sm font-semibold flex items-center">
							{employee.points} PT
						</p> */}
					</div>
				))
			) : (
				<div className="h-64 flex flex-col items-center justify-center gap-1">
					<ArchiveX size={60} />
					<h2 className="text-xl font-semibold">No data</h2>
				</div>
			)}
		</div>
	);
}

export default EmployeeRankingList;
