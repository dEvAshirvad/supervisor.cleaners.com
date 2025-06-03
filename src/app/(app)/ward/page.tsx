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
import Link from "next/link";
import { useWards } from "@/hooks/useWards";

export interface Ward {
	id: number;
	name: string;
	address: string;
	assignedSupervisor: string;
	latestSwachhataScore: number;
}

export const wardsList = [
	{
		id: 1,
		name: "Ward 1",
		address: "Address 1",
		assignedSupervisor: "Supervisor 1",
		latestSwachhataScore: 7.8,
	},
	{
		id: 2,
		name: "Ward 2",
		address: "Address 2",
		assignedSupervisor: "Supervisor 2",
		latestSwachhataScore: 7.0,
	},
	{
		id: 3,
		name: "Ward 3",
		address: "Address 3",
		assignedSupervisor: "Supervisor 3",
		latestSwachhataScore: 6.8,
	},
];

function WardPage() {
	const {
		data: wards,
		isLoading,
		isFetched,
		refetch,
		error,
	} = useWards().getWards();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div className="text-red-500">{error.message}</div>;
	}

	return (
		<>
			<PageHeader
				title="वाड (Ward)"
				description="वाड प्रबंधन करें (Manage wards)"
			/>

			<DashboardCards
				title="सभी वाड (All Wards)"
				onRefresh={() => {}}
				className="aspect-[16/7]">
				<div className="grid lg:grid-cols-3 gap-4">
					{/* @ts-ignore */}
					{wards?.data.data.docs.length > 0
						? // @ts-ignore
						  wards?.data.data.docs.map((ward: Ward) => (
								<WardCard key={ward.id} ward={ward} onUpdate={() => {}} />
						  ))
						: "No wards found"}
				</div>
			</DashboardCards>
		</>
	);
}

function WardCard({ ward, onUpdate }: { ward: Ward; onUpdate: () => void }) {
	return (
		<Link href={`/ward/${ward.name}/area`}>
			<Dialog>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Area</DialogTitle>
						<DialogDescription>Edit the area details</DialogDescription>
					</DialogHeader>
					<AddLocationForm refetch={onUpdate} type="edit" area={ward} />
				</DialogContent>
				<Card className="rounded-md border-4 border-primary shadow-md">
					<CardHeader className="space-y-3">
						<div className="">
							<CardTitle className="font-black text-2xl capitalize">
								{ward.name}
							</CardTitle>
							{/* <CardDescription className="">{ward.address}</CardDescription> */}
							<p className="text-sm text-muted-foreground">
								Assigned Supervisor: {ward.assignedSupervisor}
							</p>
						</div>
						<div className="space-y-1">
							<h2 className="text-sm font-semibold leading-none">
								Latest Swachhata Score
							</h2>
							<p className="text-secondary leading-none text-xl flex font-bold items-center gap-2">
								{ward.latestSwachhataScore || 0}
								<Star size={16} className="fill-yellow-400 text-yellow-800" />
							</p>
						</div>
					</CardHeader>
					{/* <CardFooter className="flex justify-end">
						<DialogTrigger asChild>
							<Button variant={"secondary"} size={"sm"} className="w-full">
								<Edit className="h-4 w-4 mr-2" />
								Edit
							</Button>
						</DialogTrigger>
					</CardFooter> */}
				</Card>
			</Dialog>
		</Link>
	);
}

export default WardPage;
