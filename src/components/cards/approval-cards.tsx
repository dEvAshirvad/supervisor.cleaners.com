import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ArchiveX, Calendar, Check, Eye, MapPin, Users, X } from "lucide-react";
import { Button } from "../ui/button";
import { format, formatDistance } from "date-fns";

function ApprovalCards({
	cards,
}: {
	cards: {
		id: string;
		slug: string;
		title: string;
		location: {
			title: string;
		};
		dueDate: Date;
		approvalRaisedAt: Date;
		staff: {
			name: string;
		}[];
	}[];
}) {
	return (
		<div className="">
			{cards.length > 0 ? (
				cards.map((card) => (
					<Card className="bg-primary/30 border-l-primary border-l-4 rounded-md">
						<CardHeader>
							<div className="flex justify-between">
								<div className="space-y-2">
									<h1 className="font-bold">{card.title}</h1>
									<div className="space-y-1">
										<div className="flex gap-2 items-center font-medium">
											<MapPin size={12} />
											<p className="text-xs">{card.location.title}</p>
										</div>
										<div className="flex gap-2 items-center font-medium">
											<Calendar size={12} />
											<p className="text-xs">
												{card.dueDate.toLocaleDateString()}
											</p>
										</div>
										<div className="flex gap-2 items-center font-medium">
											<Users size={12} />
											<p className="text-xs">
												{card.staff
													.slice(0, 2)
													.map((staff) => staff.name)
													.join(", ") +
													(card.staff.length > 2
														? ` + ${card.staff.length - 2} more`
														: "")}
											</p>
										</div>
									</div>
								</div>
								<div className="text-sm">
									{formatDistance(card.approvalRaisedAt, new Date(), {
										addSuffix: true,
									})}
								</div>
							</div>
						</CardHeader>
						<CardFooter className="flex gap-2">
							<Button
								variant={"outline"}
								className="bg-accent text-accent-foreground font-bold">
								<Eye />
								View
							</Button>
							<Button className="bg-green-500 text-white font-bold">
								<Check />
								Approve
							</Button>
							<Button className="bg-red-500 text-white font-bold">
								<X />
								Reject
							</Button>
						</CardFooter>
					</Card>
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

export default ApprovalCards;
