"use client";

import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Task {
	_id: string;
	name: string;
	location: {
		_id: string;
		name: string;
	};
	assignedTo: {
		_id: string;
		name: string;
		contact: string;
	};
	dueDate: string;
	status: "pending" | "in-progress" | "completed" | "overdue";
}

function TasksList({ refetch }: { refetch: boolean }) {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [message, setMessage] = useState("");

	const fetchTasks = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("http://localhost:3030/api/v1/assignments", {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Failed to fetch tasks");
			}

			const data = await response.json();
			setTasks(data.data.docs);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch tasks");
		} finally {
			setIsLoading(false);
		}
	};

	const sendMessage = async () => {
		if (!selectedTask?.assignedTo.contact) return;

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
						numbers: selectedTask.assignedTo.contact,
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

	useEffect(() => {
		fetchTasks();
	}, [refetch]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Send Message</DialogTitle>
						<DialogDescription>
							Send message to {selectedTask?.assignedTo.name}
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
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Task Name</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Assigned To</TableHead>
							<TableHead>Due Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tasks.map((task) => (
							<TableRow key={task._id}>
								<TableCell className="font-medium">{task.name}</TableCell>
								<TableCell className="font-medium">
									{task.location.name}
								</TableCell>
								<TableCell>{task.assignedTo.name}</TableCell>
								<TableCell>{format(new Date(task.dueDate), "PPP")}</TableCell>
								<TableCell>
									<span
										className={`inline-flex capitalize items-center rounded-full px-2 py-1 text-xs font-medium ${
											task.status === "completed"
												? "bg-green-100 text-green-700"
												: task.status === "in-progress"
												? "bg-blue-100 text-blue-700"
												: task.status === "overdue"
												? "bg-red-100 text-red-700"
												: "bg-yellow-100 text-yellow-700"
										}`}>
										{task.status}
									</span>
								</TableCell>
								<TableCell>
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											setSelectedTask(task);
											setOpen(true);
										}}>
										Send Message
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

export default TasksList;
