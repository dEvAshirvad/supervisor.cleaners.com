"use client";
import React from "react";
import AppHeader from "./app-header";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function AppLayout({ children }: { children: React.ReactNode }) {
	// const router = useRouter();
	// const { data: session, isPending, error, refetch } = useSession();

	// if (isPending) return <div>Loading...</div>;
	// if (error) return <div>Error: {error.message}</div>;

	// if (!session || session.user?.role !== "supervisor") {
	// 	router.push("/signin");
	// }

	// console.log(session);

	return (
		<div className="relative">
			<AppHeader />
			<div className="container px-6 mx-auto py-10 space-y-8 min-h-[calc(100vh-5rem)]">
				{children}
			</div>
			<Image
				src="/background.png"
				alt="app-bg"
				className="absolute top-0 left-0 w-full h-full object-fill -z-10 opacity-50 grayscale-[20%]"
				width={1000}
				height={1000}
			/>
		</div>
	);
}

export default AppLayout;
