"use client";

import CardsGrid from "@/components/cards-grid";
import PageHeader from "@/components/page-header";
import {
	BarChart,
	BrushCleaning,
	ChartPie,
	Map,
	Plus,
	RotateCw,
} from "lucide-react";
import { ListTodo } from "lucide-react";
import { LayoutList } from "lucide-react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApprovalCards from "@/components/cards/approval-cards";
import DashboardCards from "@/components/cards/dashboard-cards";
import EmployeeRankingList from "@/components/list/employee-ranking-list";
import ActiveTasksList from "@/components/list/active-tasks-list";
import Link from "next/link";

const cards: Card[] = [
	{
		title: "सक्रिय कर्मचारी (Active Staff)",
		icon: Users,
		progress: { total: 30, current: 25 },
	},
	{
		title: "लंबित कार्य (Pending Tasks)",
		icon: LayoutList,
		progress: { total: 30, current: 20 },
	},
	{
		title: "पूर्ण कार्य (Completed Tasks)",
		icon: ListTodo,
		progress: { total: 30, current: 10 },
	},
	{
		title: "औसत स्वच्छता स्कोर (Average Cleanliness Score)",
		icon: BrushCleaning,
		progress: { total: 10, current: 7.8 },
	},
];

const approvalCards = [
	{
		id: "1",
		slug: "road-cleaning",
		title: "सड़क की सफाई (Road Cleaning)",
		location: { title: "NIT Chowk" },
		dueDate: new Date(),
		approvalRaisedAt: new Date(),
		staff: [
			{ name: "John Doe" },
			{ name: "Jane Doe" },
			{ name: "Jim Doe" },
			{ name: "John Doe" },
			{ name: "Jane Doe" },
		],
	},
];

const employees = [
	{ name: "John Doe", tasks: 10, points: 100 },
	{ name: "Jane Doe", tasks: 10, points: 100 },
	{ name: "Jim Doe", tasks: 10, points: 100 },
	{ name: "John Doe", tasks: 10, points: 100 },
	{ name: "Jane Doe", tasks: 10, points: 100 },
];

const tasks = [
	{
		title: "सड़क की सफाई (Road Cleaning)",
		area: { name: "NIT Chowk" },
		staff: { name: "John Doe" },
		dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
		status: "pending",
	},
];
export default function Home() {
	return (
		<>
			<PageHeader
				title="डैशबोर्ड (Dashboard)"
				description="आज के आंकड़े और गतिविधियाँ (Today's statistics and activities)"
				updatedAt={new Date()}
			/>
			<CardsGrid cards={cards} />
			<div className="flex lg:flex-row flex-col gap-4 items-start">
				<DashboardCards
					title="लंबित अनुमोदन (Pending Approval)"
					onRefresh={() => {}}>
					<ApprovalCards cards={[]} />
				</DashboardCards>
				<DashboardCards
					title="शीर्ष प्रदर्शक (Top Performers)"
					onRefresh={() => {}}>
					<EmployeeRankingList employees={[]} />
				</DashboardCards>
			</div>
			<DashboardCards title="त्वरित सम्पादन (Quick Actions)">
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
			</DashboardCards>
			<DashboardCards title="सक्रिय कार्य (Active Tasks)" onRefresh={() => {}}>
				<ActiveTasksList tasks={tasks} />
			</DashboardCards>
		</>
	);
}
