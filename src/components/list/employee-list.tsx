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
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { authClient, useSession } from "@/lib/auth-client";

function EmployeeList({ refetch }: { refetch: boolean }) {
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
					filterValue: "workers",
				},
			});
			setEmployees(users.data?.users || []);
		};
		fetchEmployees();
	}, [refetch]);

	const sendMessage = async () => {
		if (!selectedEmployee?.contact) return;

		try {
			const response = await fetch(
				"http://localhost:3030/api/v1/message/send",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						message,
						numbers: selectedEmployee.contact,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			setOpen(false);
			setMessage("");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Send Message</DialogTitle>
						<DialogDescription>
							Send message to {selectedEmployee?.name}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<Textarea
							placeholder="Enter your message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button onClick={sendMessage}>Send Message</Button>
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
									setSelectedEmployee(employee);
									setOpen(true);
								}}
								className="border-secondary text-secondary"
								size={"sm"}>
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
