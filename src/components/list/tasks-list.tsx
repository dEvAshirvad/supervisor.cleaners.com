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
	};
	dueDate: string;
	status: "pending" | "in-progress" | "completed" | "overdue";
}

function TasksList({ refetch }: { refetch: boolean }) {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

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

	useEffect(() => {
		fetchTasks();
	}, [refetch]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Task Name</TableHead>
						<TableHead>Location</TableHead>
						<TableHead>Assigned To</TableHead>
						<TableHead>Due Date</TableHead>
						<TableHead>Status</TableHead>
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
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default TasksList;
