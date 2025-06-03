"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
	BrushCleaning,
	LayoutList,
	ListTodo,
	LucideIcon,
	Users,
	Map,
} from "lucide-react";
import { Progress } from "./ui/progress";
import { useTasks } from "@/hooks/useTasks";

function CardsGrid({ className }: { className?: string }) {
	const [cards, setCards] = useState<Card[]>([]);
	const {
		data: assignments,
		isLoading,
		isFetched,
		refetch,
	} = useTasks().getAssignments();
	useEffect(() => {
		if (isFetched) {
			console.log(assignments?.data.data);
			const cards = [
				{
					title: "Total Tasks",
					icon: ListTodo,
					progress: {
						current: assignments?.data.data.total,
					},
				},
				{
					title: "Pending Tasks",
					icon: ListTodo,
					progress: {
						current: assignments?.data.data.docs.filter(
							(assignment: any) => assignment.status === "assigned"
						).length,
						total: assignments?.data.data.docs.length,
					},
				},
				{
					title: "Completed Tasks",
					icon: ListTodo,
					progress: {
						current: assignments?.data.data.docs.filter(
							(assignment: any) => assignment.status === "completed"
						).length,
						total: assignments?.data.data.docs.length,
					},
				},
				{
					title: "Cancelled Tasks",
					icon: ListTodo,
					progress: {
						current: assignments?.data.data.docs.filter(
							(assignment: any) => assignment.status === "cancelled"
						).length,
						total: assignments?.data.data.docs.length,
					},
				},
			];
			setCards(cards);
		}
	}, [assignments, isFetched]);
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				className
			)}>
			{cards?.map((card, index) => (
				<SectionCard key={index} {...card} />
			))}
		</div>
	);
}

function SectionCard({ title, icon, progress }: Card) {
	return (
		<Card className="border-0 shadow-md border-t-4 border-primary">
			<CardHeader>
				<div className="flex justify-between">
					<div className="space-y-1 w-4/5">
						<h1 className="text-sm w-4/5">{title}</h1>
						<p className="text-xs text-muted-foreground">
							<span className="text-2xl font-bold text-secondary">
								{progress.current}
							</span>
							{progress.total && `/${progress.total}`}
						</p>
					</div>
					{React.createElement(icon, {
						className: "size-8 bg-secondary text-background p-1.5 rounded-md",
					})}
				</div>
			</CardHeader>
			<CardFooter>
				<Progress
					value={
						progress.total ? (progress.current / progress.total) * 100 : 100
					}
					className="text-secondary"
				/>
			</CardFooter>
		</Card>
	);
}

export default CardsGrid;
