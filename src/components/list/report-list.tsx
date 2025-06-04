import { useReport } from "@/hooks/useReport";
import React from "react";
import { format } from "date-fns";
import { ArchiveX } from "lucide-react";
import DashboardCards from "../cards/dashboard-cards";

export interface WardReport {
	wardName: string;
	date: string;
	status: "assigned" | "in_progress" | "completed" | "cancelled" | "";
	totalAssignments: number;
	completedAssignments: number;
	incompleteAssignments: number;
	averageCleanlinessScore: number;
	totalGarbageFound: number;
	supervisorName: string;
	type: "full";
}

export interface LocationReport {
	locationName: string;
	totalGarbageFound: number;
	date: string;
	averageCleanlinessScore: number;
	supervisorName: string;
	status: "assigned" | "in_progress" | "completed" | "cancelled" | "";
	type: "wardwise";
}

type Report = WardReport | LocationReport;

function WardReportList({ reports }: { reports: WardReport[] }) {
	return (
		<div>
			<div className="h-12 rounded-lg px-10 grid lg:grid-cols-7 grid-cols-2 odd:bg-accent">
				<p className="text-sm font-bold flex items-center">Ward Name</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Date</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Status</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Cleanliness Score
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Garbage Found
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Supervisor
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Assignments
				</p>
			</div>
			{reports.length > 0 ? (
				reports.map((report, index) => (
					<div
						key={index}
						className="h-12 rounded-lg px-10 grid lg:grid-cols-7 grid-cols-2 odd:bg-accent">
						<p className="text-sm flex font-semibold items-center capitalize">
							{report.wardName}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{format(new Date(report.date), "dd MMM yyyy")}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							<span
								className={`px-2 py-1 rounded-full text-xs font-semibold ${
									report.status === "completed"
										? "bg-green-100 text-green-800"
										: report.status === "in_progress"
										? "bg-yellow-100 text-yellow-800"
										: report.status === "cancelled"
										? "bg-red-100 text-red-800"
										: "bg-blue-100 text-blue-800"
								}`}>
								{report.status
									.split("_")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ")}
							</span>
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{report.averageCleanlinessScore}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{report.totalGarbageFound}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{report.supervisorName}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							<span>
								{report.completedAssignments}/{report.totalAssignments}
							</span>
						</p>
					</div>
				))
			) : (
				<div className="h-64 flex flex-col items-center justify-center gap-1">
					<ArchiveX size={60} />
					<h2 className="text-xl font-semibold">No ward reports found</h2>
				</div>
			)}
		</div>
	);
}

function LocationReportList({ reports }: { reports: LocationReport[] }) {
	return (
		<div>
			<div className="h-12 rounded-lg px-10 grid lg:grid-cols-6 grid-cols-2 odd:bg-accent">
				<p className="text-sm font-bold flex items-center">Location Name</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Date</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Status</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Cleanliness Score
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Garbage Found
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Supervisor
				</p>
			</div>
			{reports.length > 0 ? (
				reports.map((report, index) => (
					<div
						key={index}
						className="h-12 rounded-lg px-10 grid lg:grid-cols-6 grid-cols-2 odd:bg-accent">
						<p className="text-sm flex font-semibold items-center capitalize">
							{report.locationName}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{format(new Date(report.date), "dd MMM yyyy")}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							<span
								className={`px-2 py-1 rounded-full text-xs font-semibold ${
									report.status === "completed"
										? "bg-green-100 text-green-800"
										: report.status === "in_progress"
										? "bg-yellow-100 text-yellow-800"
										: report.status === "cancelled"
										? "bg-red-100 text-red-800"
										: "bg-blue-100 text-blue-800"
								}`}>
								{report.status
									.split("_")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ")}
							</span>
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{report.averageCleanlinessScore}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{report.totalGarbageFound}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{report.supervisorName}
						</p>
					</div>
				))
			) : (
				<div className="h-64 flex flex-col items-center justify-center gap-1">
					<ArchiveX size={60} />
					<h2 className="text-xl font-semibold">No location reports found</h2>
				</div>
			)}
		</div>
	);
}

function ReportList({
	generateReportData,
	type,
}: {
	generateReportData: Report[];
	type: "full" | "wardwise";
}) {
	if (!generateReportData)
		return (
			<DashboardCards title="रिपोर्ट (Generate Reports)">
				<div className="h-64 flex flex-col items-center justify-center gap-1">
					<ArchiveX size={60} />
					<h2 className="text-xl font-semibold">
						No report found, please generate a report first
					</h2>
				</div>
			</DashboardCards>
		);

	return generateReportData.length > 0 && type === "full" ? (
		<DashboardCards title="रिपोर्ट (Full Reports)">
			<WardReportList reports={generateReportData as WardReport[]} />
		</DashboardCards>
	) : generateReportData.length > 0 && type === "wardwise" ? (
		<DashboardCards title="रिपोर्ट (Wardwise Reports)">
			<LocationReportList reports={generateReportData as LocationReport[]} />
		</DashboardCards>
	) : generateReportData.length === 0 ? (
		<DashboardCards title="रिपोर्ट (No Reports Found)">
			<div className="h-64 flex flex-col items-center justify-center gap-1">
				<ArchiveX size={60} />
				<h2 className="text-xl font-semibold">
					No report found, please generate tasks first
				</h2>
			</div>
		</DashboardCards>
	) : (
		<></>
	);
}

export default ReportList;
