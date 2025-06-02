"use client";
import React from "react";
import AppHeader from "./app-header";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function AppLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { data: session, isPending, error, refetch } = useSession();

	if (isPending) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	if (!session || session.user?.role !== "supervisor") {
		router.push("/signin");
	}

	console.log(session);

	return (
		<div>
			<AppHeader />
			<div className="container px-6 mx-auto py-10 space-y-8">{children}</div>
		</div>
	);
}

export default AppLayout;
