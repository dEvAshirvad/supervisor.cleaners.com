"use client";
import { ArchiveX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { authClient, useSession } from "@/lib/auth-client";

function EmployeeList({ refetch }: { refetch: boolean }) {
	const [employees, setEmployees] = useState<any[]>([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			const users = await authClient.admin.listUsers({
				query: {
					filterField: "role",
					filterOperator: "eq",
					filterValue: "workers",
				},
			});
			console.log(users.data?.users);
			setEmployees(users.data?.users || []);
		};
		fetchEmployees();
	}, [refetch]);

	const [open, setOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
	const [dialogType, setDialogType] = useState<"sms" | "edit">("edit");
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					{dialogType === "edit" ? (
						<h1>Edit : {selectedEmployee?.name}</h1>
					) : (
						<div className="">
							<Textarea placeholder="Enter SMS" />
						</div>
					)}
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						{dialogType === "edit" ? (
							<Button>Save changes</Button>
						) : (
							<Button>Send SMS</Button>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<div className="h-12 rounded-lg px-10 grid lg:grid-cols-6 grid-cols-2 odd:bg-accent">
				<p className="text-sm font-bold flex items-center">Name</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Id</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Contact</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Completed Tasks
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Points</p>
				<p className="text-sm font-bold flex items-center justify-end lg:justify-start">
					Actions
				</p>
			</div>
			{employees.length > 0 ? (
				employees.map((employee, index) => (
					<div
						key={index}
						className="h-12 rounded-lg px-10 grid lg:grid-cols-6 grid-cols-2 odd:bg-accent">
						<p className="text-sm flex font-semibold items-center">
							{employee.name}
						</p>
						<p className="text-sm font-semibold uppercase lg:flex hidden items-center">
							{employee.username}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{employee.contact}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{employee.completedTasks}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{employee.points} PT
						</p>
						<div className="flex items-center justify-end lg:justify-start gap-2">
							<Button
								variant={"outline"}
								onClick={() => {
									setDialogType("edit");
									setSelectedEmployee(employee);
									setOpen(true);
								}}
								className="border-secondary text-secondary"
								size={"sm"}>
								Edit
							</Button>
							<Button
								size={"sm"}
								onClick={() => {
									setDialogType("sms");
									setSelectedEmployee(employee);
									setOpen(true);
								}}>
								Send SMS
							</Button>
						</div>
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

export default EmployeeList;
