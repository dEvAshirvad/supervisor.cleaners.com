"use client";
import DashboardCards from "@/components/cards/dashboard-cards";
import AddLocationForm from "@/components/forms/add-location-form";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plus, Star } from "lucide-react";
import React from "react";
import { useLocations } from "@/hooks/useLocations";
import Link from "next/link";

interface Area {
	id: number;
	name: string;
	address: string;
	latestSwachhataScore: number;
}

function AreaPage({ params }: { params: { wardId: string } }) {
	const { wardId } = params;
	const {
		data: areas,
		isLoading,
		isFetched,
		refetch,
		error,
	} = useLocations().getLocationByWardName(wardId.replace(/%20/g, " "));

	return (
		<>
			<PageHeader
				title={`${wardId.replace(/%20/g, " ")}`}
				description="नए स्थान जोड़ें और उनका प्रबंधन करें (Add new locations and manage them)"
			/>
			<Sheet>
				<SheetTrigger>
					<Button className="w-fit">
						<Plus />
						नया क्षेत्र जोड़ें (Add new area)
					</Button>
				</SheetTrigger>
				<SheetContent>
					<AddLocationForm refetch={refetch} type="add" area={null} />
				</SheetContent>
			</Sheet>

			<DashboardCards title="सभी क्षेत्र (All Area)" onRefresh={refetch}>
				{isLoading ? (
					<div>Loading...</div>
				) : error ? (
					<div className="text-red-500">{error.message}</div>
				) : (
					<div className="grid lg:grid-cols-3 gap-4">
						{/* @ts-ignore */}
						{areas?.data.data.docs.length > 0
							? // @ts-ignore
							  areas?.data.data.docs.map((area: Area) => (
									<AreaCard
										key={area.id}
										area={area}
										onUpdate={refetch}
										wardId={wardId}
									/>
							  ))
							: "No areas found"}
					</div>
				)}
			</DashboardCards>
		</>
	);
}

function AreaCard({
	area,
	onUpdate,
	wardId,
}: {
	area: Area;
	onUpdate: () => void;
	wardId: string;
}) {
	return (
		<div className="">
			<Card className="rounded-md border-4 border-primary shadow-md">
				<CardHeader className="space-y-3">
					<div className="">
						<CardTitle className="font-black text-2xl capitalize">
							{area.name}
						</CardTitle>
						<CardDescription className="">
							{area.address || "No address found"}
						</CardDescription>
					</div>
					<div className="space-y-1">
						<h2 className="text-sm font-semibold leading-none">
							Latest Swachhata Score
						</h2>
						<p className="text-secondary leading-none text-xl flex font-bold items-center gap-2">
							{area.latestSwachhataScore || 0}
							<Star size={16} className="fill-yellow-400 text-yellow-800" />
						</p>
					</div>
				</CardHeader>
				<CardFooter className="flex justify-end">
					<Link
						href={`/ward/${wardId}/area/${area.name}/history`}
						className="w-full">
						<Button variant={"secondary"} size={"sm"} className="w-full">
							See History
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}

export default AreaPage;
