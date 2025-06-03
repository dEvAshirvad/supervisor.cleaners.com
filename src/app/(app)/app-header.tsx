"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
	BrushCleaning,
	FileText,
	Layout,
	List,
	Map,
	Menu,
	User,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function AppHeader() {
	const { data: session, isPending, error, refetch } = useSession();
	const pathname = usePathname();
	return (
		<header className="h-20 bg-accent border-b shadow-lg">
			<nav className="flex items-center justify-between h-full px-6 container mx-auto">
				<div className="flex items-center gap-10">
					<div className="flex items-center gap-2">
						<BrushCleaning className="fill-primary size-8" />
						<div className="">
							<h1 className="text-xl leading-none font-bold">
								नगर निगम रायपुर
							</h1>
							<p className="text-xs mt-0.5">Waste Management Admin Portal</p>
						</div>
					</div>
					<div className="hidden lg:flex items-center gap-4 text-sm">
						<Link
							href="/"
							className={cn(
								"flex items-center gap-2",
								pathname === "/" &&
									"text-primary font-black border-b-2 border-secondary"
							)}>
							<Layout className="size-4 stroke-2" />
							डैशबोर्ड (Dashboard)
						</Link>
						{/* <Link
							href="/tasks"
							className={cn(
								"flex items-center gap-2",
								pathname.startsWith("/tasks") &&
									"text-primary font-black border-b-2 border-secondary"
							)}>
							<List className="size-4 stroke-2" />
							टास्क्स (Tasks)
						</Link> */}
						<Link
							href="/supervisor"
							className={cn(
								"flex items-center gap-2",
								pathname.startsWith("/supervisor") &&
									"text-primary font-black border-b-2 border-secondary"
							)}>
							<Users className="size-4 stroke-2" />
							सुपरवाइजर (Supervisor)
						</Link>
						<Link
							href="/ward"
							className={cn(
								"flex items-center gap-2",
								pathname.startsWith("/ward") &&
									"text-primary font-black border-b-2 border-secondary"
							)}>
							<Map className="size-4 stroke-2" />
							वाड (Ward)
						</Link>
						<Link
							href="/report"
							className={cn(
								"flex items-center gap-2",
								pathname.startsWith("/report") &&
									"text-primary font-black border-b-2 border-secondary"
							)}>
							<FileText className="size-4 stroke-2" />
							रिपोर्ट (Report)
						</Link>
					</div>
				</div>
				<div className="flex items-center gap-4">
					{/* <Button variant="secondary" size="icon">
						<BellDot className="fill-primary" />
					</Button> */}
					{/* {session && ( */}
					<div className="flex items-center gap-2">
						<Avatar className="size-8">
							<AvatarImage src={session?.user?.image || ""} />
							<AvatarFallback>
								<User className="size-5" />
							</AvatarFallback>
						</Avatar>
						<div className="hidden lg:block">
							<p className="text-sm font-medium leading-none">
								{session?.user?.name || "Admin"}
							</p>
						</div>
					</div>
					{/* )} */}
					<div className="lg:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="size-5" />
								</Button>
							</SheetTrigger>
							<SheetContent>
								<div className="flex flex-col gap-4 text-xl">
									<Link
										href="/"
										className={cn(
											"flex items-center gap-2 w-fit",
											pathname === "/" &&
												"text-primary font-black border-b-2 border-secondary"
										)}>
										<Layout className="size-4 stroke-2" />
										डैशबोर्ड (Dashboard)
									</Link>
									{/* <Link
										href="/tasks"
										className={cn(
											"flex items-center gap-2 w-fit",
											pathname.startsWith("/tasks") &&
												"text-primary font-black border-b-2 border-secondary"
										)}>
										<List className="size-4 stroke-2" />
										टास्क्स (Tasks)
									</Link> */}
									<Link
										href="/staff"
										className={cn(
											"flex items-center gap-2 w-fit",
											pathname.startsWith("/staff") &&
												"text-primary font-black border-b-2 border-secondary"
										)}>
										<Users className="size-4 stroke-2" />
										कर्मचारी (Staff)
									</Link>
									<Link
										href="/area"
										className={cn(
											"flex items-center gap-2 w-fit",
											pathname.startsWith("/area") &&
												"text-primary font-black border-b-2 border-secondary"
										)}>
										<Map className="size-4 stroke-2" />
										क्षेत्र (Area)
									</Link>
									<Link
										href="/report"
										className={cn(
											"flex items-center gap-2 w-fit",
											pathname.startsWith("/report") &&
												"text-primary font-black border-b-2 border-secondary"
										)}>
										<FileText className="size-4 stroke-2" />
										रिपोर्ट (Report)
									</Link>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default AppHeader;
