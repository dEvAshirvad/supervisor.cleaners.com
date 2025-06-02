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
import { Edit, Plus, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

interface Area {
	id: number;
	name: string;
	address: string;
	latestSwachhataScore: number;
}

function AreaPage() {
	const { data: session } = useSession();
	const [areas, setAreas] = useState<Area[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchAreas = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("http://localhost:3030/api/v1/locations", {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Failed to fetch areas");
			}

			const data = await response.json();
			setAreas(data.data.docs);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch areas");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAreas();
		console.log(areas);
	}, [session?.session?.token]);

	return (
		<>
			<PageHeader
				title="क्षेत्र (Area)"
				description="नए स्थान जोड़ें और उनका प्रबंधन करें (Add new locations and manage them)"
				updatedAt={new Date()}
			/>
			<Sheet>
				<SheetTrigger>
					<Button className="w-fit">
						<Plus />
						नया क्षेत्र जोड़ें (Add new area)
					</Button>
				</SheetTrigger>
				<SheetContent>
					<AddLocationForm refetch={fetchAreas} type="add" area={null} />
				</SheetContent>
			</Sheet>

			<DashboardCards title="सभी क्षेत्र (All Area)" onRefresh={fetchAreas}>
				{isLoading ? (
					<div>Loading...</div>
				) : error ? (
					<div className="text-red-500">{error}</div>
				) : (
					<div className="grid lg:grid-cols-3 gap-4">
						{areas.length > 0
							? areas.map((area) => (
									<AreaCard key={area.id} area={area} onUpdate={fetchAreas} />
							  ))
							: "No areas found"}
					</div>
				)}
			</DashboardCards>
		</>
	);
}

function AreaCard({ area, onUpdate }: { area: Area; onUpdate: () => void }) {
	return (
		<div className="">
			<Dialog>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Area</DialogTitle>
						<DialogDescription>Edit the area details</DialogDescription>
					</DialogHeader>
					<AddLocationForm refetch={onUpdate} type="edit" area={area} />
				</DialogContent>
				<Card className="rounded-md border-4 border-primary shadow-md">
					<CardHeader className="space-y-3">
						<div className="">
							<CardTitle className="font-black text-2xl">{area.name}</CardTitle>
							<CardDescription className="">{area.address}</CardDescription>
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
						<DialogTrigger asChild>
							<Button variant={"secondary"} size={"sm"} className="w-full">
								<Edit className="h-4 w-4 mr-2" />
								Edit
							</Button>
						</DialogTrigger>
					</CardFooter>
				</Card>
			</Dialog>
		</div>
	);
}

export default AreaPage;
