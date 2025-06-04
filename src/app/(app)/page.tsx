"use client";
import CardsGrid from "@/components/cards-grid";
import PageHeader from "@/components/page-header";
import { ChartPie, Map, Plus } from "lucide-react";
import { Users } from "lucide-react";
import DashboardCards from "@/components/cards/dashboard-cards";
import EmployeeRankingList from "@/components/list/employee-ranking-list";
import ActiveTasksList from "@/components/list/active-tasks-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
	const { autoGenerateTasks } = useTasks();

	function handleAutoGenerateTasks() {
		autoGenerateTasks.mutate();
	}
	return (
		<>
			<PageHeader
				title="डैशबोर्ड (Dashboard)"
				description="आज के आंकड़े और गतिविधियाँ (Today's statistics and activities)"
			/>
			<CardsGrid />
			<div className="flex lg:flex-row flex-col gap-4 items-start">
				{/* <DashboardCards
					title="लंबित अनुमोदन (Pending Approval)"
					onRefresh={() => {}}>
					<ApprovalCards cards={approvalCards} />
				</DashboardCards> */}
				<DashboardCards title="शीर्ष प्रदर्शक (Top Performers)">
					<EmployeeRankingList />
				</DashboardCards>
			</div>
			{/* <DashboardCards title="त्वरित सम्पादन (Quick Actions)">
				<div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
					<Link
						href={""}
						className="w-full aspect-video border border-dashed border-secondary rounded-md flex flex-col gap-1 items-center justify-center">
						<Plus size={40} />
						<p className="text-sm font-semibold">कार्य जोड़ें (Add Task)</p>
					</Link>
					<Link
						href={""}
						className="w-full aspect-video border border-dashed border-secondary rounded-md flex flex-col gap-1 items-center justify-center">
						<Users size={40} />
						<p className="text-sm font-semibold">कर्मचारी जोड़ें (Add Staff)</p>
					</Link>
					<Link
						href={""}
						className="w-full aspect-video border border-dashed border-secondary rounded-md flex flex-col gap-1 items-center justify-center">
						<Map size={40} />
						<p className="text-sm font-semibold">क्षेत्र जोड़ें (Add Area)</p>
					</Link>
					<Link
						href={""}
						className="w-full aspect-video border border-dashed border-secondary rounded-md flex flex-col gap-1 items-center justify-center">
						<ChartPie size={40} />
						<p className="text-sm font-semibold">
							रिपोर्ट विश्लेषण (Analyse Report)
						</p>
					</Link>
				</div>
			</DashboardCards> */}
			<DashboardCards
				title="सक्रिय कार्य (Active Tasks)"
				sideComponent={
					<Button size={"sm"} onClick={handleAutoGenerateTasks}>
						Auto Generate
					</Button>
				}>
				<ActiveTasksList />
			</DashboardCards>
		</>
	);
}
