"use client";

import React from "react";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

function DashboardCards({
	children,
	onRefresh,
	title,
	className,
	sideComponent,
}: {
	children: React.ReactNode;
	onRefresh?: () => void;
	title: string;
	className?: string;
	sideComponent?: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				"flex flex-1 w-full flex-col gap-4 bg-background p-6 rounded-md space-y-2",
				className
			)}>
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-bold lg:w-3/5 w-4/5">{title}</h1>
				{onRefresh && (
					<Button
						onClick={onRefresh}
						variant={"link"}
						className="p-0 text-secondary font-bold">
						<RotateCw /> Refresh
					</Button>
				)}
				{sideComponent && sideComponent}
			</div>
			{children}
		</div>
	);
}

export default DashboardCards;
