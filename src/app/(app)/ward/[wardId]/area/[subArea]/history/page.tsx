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

import { useLocations } from "@/hooks/useLocations";
import LocationHistoryList from "@/components/list/location-history-list";

interface Area {
	id: number;
	name: string;
	address: string;
	latestSwachhataScore: number;
}

function AreaPageHistory({
	params,
}: {
	params: { wardId: string; subArea: string };
}) {
	const { wardId, subArea } = params;
	const {
		data: areas,
		isLoading,
		isFetched,
		refetch,
		error,
	} = useLocations().getLocationHistory(subArea.replace(/%20/g, " "));

	return (
		<>
			<PageHeader
				title={`${subArea.replace(/%20/g, " ")} History`}
				description="इस क्षेत्र का इतिहास देखें (View the history of this area)"
			/>

			<DashboardCards title="सभी इतिहास (All History)" onRefresh={refetch}>
				{/* @ts-ignore */}
				{areas?.data.data.docs.length > 0 ? (
					// @ts-ignore
					<LocationHistoryList locations={areas?.data.data.docs || []} />
				) : (
					<div>No history found</div>
				)}
			</DashboardCards>
		</>
	);
}

export default AreaPageHistory;
