import { ArchiveX } from "lucide-react";
import React from "react";

function EmployeeRankingList({ employees }: { employees: any[] }) {
	return (
		<div>
			<div className="h-12 rounded-lg px-10 grid grid-cols-4 odd:bg-accent">
				<p className="text-sm font-bold flex items-center">Rank</p>
				<p className="text-sm font-bold flex items-center">Name</p>
				<p className="text-sm font-bold flex items-center">Tasks</p>
				<p className="text-sm font-bold flex items-center">Points</p>
			</div>
			{employees.length > 0 ? (
				employees.map((employee, index) => (
					<div
						key={index}
						className="h-12 rounded-lg px-10 grid grid-cols-4 odd:bg-accent">
						<p className="text-sm flex font-semibold items-center">
							# {index + 1}
						</p>
						<p className="text-sm font-semibold flex items-center">
							{employee.name}
						</p>
						<p className="text-sm flex items-center">{employee.tasks}</p>
						<p className="text-sm font-semibold flex items-center">
							{employee.points} PT
						</p>
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
