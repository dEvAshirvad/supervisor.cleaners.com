import { ArchiveX, MoreHorizontal } from "lucide-react";
import { format, formatDistance } from "date-fns";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTasks } from "@/hooks/useTasks";

function ActiveTasksList() {
	const {
		data: tasks,
		isLoading,
		isFetched,
		refetch,
	} = useTasks().getAssignments();
	return (
		<div>
			<div className="h-12 rounded-lg lg:px-10 px-4 grid lg:grid-cols-5 grid-cols-2 gap-4 odd:bg-accent">
				<p className="text-sm font-bold lg:flex hidden items-center">
					वाड (Ward)
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					अधिकारी (Supervisor)
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					(Total Locations)
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					अवधि (Due Date)
				</p>
				<p className="text-sm font-bold flex items-center lg:justify-center justify-end">
					स्थिति (Status)
				</p>
			</div>
			{tasks?.data.data.docs.length > 0 ? (
				tasks?.data.data.docs.map((task: any, index: number) => (
					<div
						key={index}
						className="h-12 rounded-lg lg:px-10 px-4 grid lg:grid-cols-5 grid-cols-2 gap-4 odd:bg-accent">
						<p className="text-sm lg:flex hidden items-center truncate capitalize">
							{task.wardName}
						</p>
						<p className="text-sm lg:flex hidden items-center truncate">
							{task.supervisorName}
						</p>
						<p className="text-sm lg:flex hidden items-center truncate">
							{task.tasks.length}
						</p>
						<p className="text-sm font-semibold lg:flex hidden items-center">
							{format(task.createdAt, "dd MMM yyyy")}
						</p>
						<div className="flex items-center lg:justify-center justify-end">
							<p
								className={cn(
									"text-sm font-semibold flex items-center capitalize w-fit px-2 py-1 rounded-md",
									task.status === "assigned" && "text-red-500 bg-red-500/10",
									task.status === "pending" &&
										"text-yellow-500 bg-yellow-500/10",
									task.status === "completed" && "text-green-500",
									task.status === "rejected" && "text-red-500"
								)}>
								{task.status}
							</p>
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

export default ActiveTasksList;
