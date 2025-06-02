import React from "react";
import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";

function PageHeader({
	title,
	description,
	updatedAt,
	refetch,
}: {
	title: string;
	description: string;
	updatedAt: Date;
	refetch?: () => void;
}) {
	return (
		<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-0 gap-4">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold">{title}</h1>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			<div className="flex items-center gap-2">
				<Button variant={"link"} className="p-0" onClick={refetch}>
					<RotateCw />
					Refresh
				</Button>
				<p className="text-sm text-muted-foreground">
					{updatedAt.toLocaleString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
			</div>
		</div>
	);
}

export default PageHeader;
