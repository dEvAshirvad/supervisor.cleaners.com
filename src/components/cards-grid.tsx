import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
	BrushCleaning,
	LayoutList,
	ListTodo,
	LucideIcon,
	Users,
} from "lucide-react";
import { Progress } from "./ui/progress";

function CardsGrid({
	className,
	cards,
}: {
	className?: string;
	cards: Card[];
}) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				className
			)}>
			{cards.map((card, index) => (
				<SectionCard key={index} {...card} />
			))}
		</div>
	);
}

function SectionCard({
	title,
	icon,
	progress,
}: {
	title: string;
	icon: LucideIcon;
	progress: {
		total: number;
		current: number;
	};
}) {
	return (
		<Card className="border-0 shadow-md border-t-4 border-primary">
			<CardHeader>
				<div className="flex justify-between">
					<div className="space-y-1">
						<h1 className="text-sm w-4/5">{title}</h1>
						<p className="text-xs text-muted-foreground">
							<span className="text-2xl font-bold text-secondary">
								{progress.current}
							</span>
							/{progress.total}
						</p>
					</div>
					{React.createElement(icon, {
						className: "size-8 bg-secondary text-background p-1.5 rounded-md",
					})}
				</div>
			</CardHeader>
			<CardFooter>
				<Progress
					value={(progress.current / progress.total) * 100}
					className="text-secondary"
				/>
			</CardFooter>
		</Card>
	);
}

export default CardsGrid;
