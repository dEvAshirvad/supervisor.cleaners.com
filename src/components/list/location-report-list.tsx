import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Eye } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useReport } from "@/hooks/useReport";

interface LocationReport {
	id: string;
	ward: string;
	totalArea: number;
	swachhataScore: number;
	assignedSupervisor: string;
	completedTasks: number;
	failedTasks: number;
}

const mockData: LocationReport[] = [
	{
		id: "1",
		ward: "Ward 1",
		totalArea: 100,
		swachhataScore: 95,
		assignedSupervisor: "Raju Kumar",
		completedTasks: 10,
		failedTasks: 2,
	},
	{
		id: "2",
		ward: "Ward 2",
		totalArea: 100,
		swachhataScore: 88,
		assignedSupervisor: "Rajesh Kumar",
		completedTasks: 10,
		failedTasks: 2,
	},
	{
		id: "3",
		ward: "Ward 3",
		totalArea: 100,
		swachhataScore: 92,
		assignedSupervisor: "Rajesh Mehta",
		completedTasks: 10,
		failedTasks: 2,
	},
];

function LocationReportList() {
	const { generateReport } = useReport();
	console.log(generateReport.data?.data);
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-center">Ward</TableHead>
						<TableHead className="text-center">Total Area</TableHead>
						<TableHead className="text-center">Swachhta Score</TableHead>
						<TableHead className="text-center">Assigned Supervisor</TableHead>
						<TableHead className="text-center">Completed Tasks</TableHead>
						<TableHead className="text-center">Failed Tasks</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{mockData.map((report) => (
						<TableRow key={report.id}>
							<TableCell className="font-medium text-center">
								{report.ward}
							</TableCell>
							<TableCell className="text-center">{report.totalArea}</TableCell>
							<TableCell className="text-center">
								{report.swachhataScore}
							</TableCell>
							<TableCell className="text-center">
								{report.assignedSupervisor}
							</TableCell>
							<TableCell className="text-center">
								{report.completedTasks}
							</TableCell>
							<TableCell className="text-center">
								{report.failedTasks}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default LocationReportList;
