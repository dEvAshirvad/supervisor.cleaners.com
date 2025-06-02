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

interface LocationReport {
	id: string;
	location: string;
	date: string;
	status: "completed" | "pending" | "in-progress";
	inspector: string;
	score: number;
}

const mockData: LocationReport[] = [
	{
		id: "1",
		location: "Downtown Branch",
		date: "2024-03-15",
		status: "completed",
		inspector: "John Doe",
		score: 95,
	},
	{
		id: "2",
		location: "Westside Office",
		date: "2024-03-14",
		status: "pending",
		inspector: "Jane Smith",
		score: 88,
	},
	{
		id: "3",
		location: "Eastside Facility",
		date: "2024-03-13",
		status: "in-progress",
		inspector: "Mike Johnson",
		score: 92,
	},
];

function LocationReportList() {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Location</TableHead>
						<TableHead>Avg Swachhta Score</TableHead>
						<TableHead>Ta</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Avg Score</TableHead>
						<TableHead className="w-[50px]"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{mockData.map((report) => (
						<TableRow key={report.id}>
							<TableCell className="font-medium">{report.location}</TableCell>
							<TableCell>{report.date}</TableCell>
							<TableCell>{report.inspector}</TableCell>
							<TableCell>
								<span
									className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
										report.status === "completed"
											? "bg-green-100 text-green-700"
											: report.status === "pending"
											? "bg-yellow-100 text-yellow-700"
											: "bg-blue-100 text-blue-700"
									}`}>
									{report.status}
								</span>
							</TableCell>
							<TableCell>{report.score}%</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="h-8 w-8 p-0">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>
											<Eye className="h-4 w-4 mr-2" />
											View Details
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Download className="h-4 w-4 mr-2" />
											Download Report
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default LocationReportList;
