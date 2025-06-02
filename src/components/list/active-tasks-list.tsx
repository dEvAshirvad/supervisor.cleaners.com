import { ArchiveX, MoreHorizontal } from "lucide-react";
import { format, formatDistance } from "date-fns";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

function ActiveTasksList({ tasks }: { tasks: any[] }) {
	return (
		<div>
			<div className="h-12 rounded-lg lg:px-10 px-4 grid lg:grid-cols-5 grid-cols-2 gap-4 odd:bg-accent">
				<p className="text-sm font-bold flex items-center">कार्य (Tasks)</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					क्षेत्र (Area)
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					अधिकारी (Staff)
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					अवधि (Due Date)
				</p>
				<p className="text-sm font-bold flex items-center lg:justify-center justify-end">
					स्थिति (Status)
				</p>
			</div>
			{tasks.length > 0 ? (
				tasks.map((task, index) => (
					<div
						key={index}
						className="h-12 rounded-lg lg:px-10 px-4 grid lg:grid-cols-5 grid-cols-2 gap-4 odd:bg-accent">
						<p className="text-sm flex font-semibold items-center truncate">
							{task.title}
						</p>
						<p className="text-sm lg:flex hidden items-center truncate">
							{task.area.name}
						</p>
						<p className="text-sm lg:flex hidden items-center truncate">
							{task.staff.name}
						</p>
						<p className="text-sm font-semibold lg:flex hidden items-center">
							{formatDistance(task.dueDate, new Date(), { addSuffix: true })}
						</p>
						<div className="flex items-center lg:justify-center justify-end">
							<p
								className={cn(
									"text-sm font-semibold flex items-center capitalize w-fit px-2 py-1 rounded-md",
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
