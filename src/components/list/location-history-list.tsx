import React from "react";
import { format } from "date-fns";
import { ArchiveX } from "lucide-react";

interface LocationHistory {
	_id: string;
	assignWard: string;
	assignSupervisor: string;
	subArea: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	beforeResultsMeta: {
		cleanlinessScore: number;
	};
	afterResultsMeta: {
		cleanlinessScore: number;
	};
}

function LocationHistoryList({ locations }: { locations: LocationHistory[] }) {
	return (
		<div>
			<div className="h-12 rounded-lg px-10 grid lg:grid-cols-7 grid-cols-2 odd:bg-accent">
				<p className="text-sm font-bold flex items-center">Ward</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Supervisor
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Sub Area
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Before Score
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					After Score
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Created At
				</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Status</p>
			</div>
			{locations.length > 0 ? (
				locations.map((location) => (
					<div
						key={location._id}
						className="h-12 rounded-lg px-10 grid lg:grid-cols-7 grid-cols-2 odd:bg-accent">
						<p className="text-sm flex font-semibold items-center capitalize">
							{location.assignWard}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{location.assignSupervisor}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{location.subArea}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{location.beforeResultsMeta?.cleanlinessScore || "Not Available"}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{location.afterResultsMeta?.cleanlinessScore || "Not Available"}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{format(new Date(location.createdAt), "dd MMM yyyy")}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							<span
								className={`px-2 py-1 rounded-full text-xs font-semibold ${
									location.status === "completed"
										? "bg-green-100 text-green-800"
										: location.status === "pending"
										? "bg-yellow-100 text-yellow-800"
										: "bg-red-100 text-red-800"
								}`}>
								{location.status.charAt(0).toUpperCase() +
									location.status.slice(1)}
							</span>
						</p>
					</div>
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

export default LocationHistoryList;
