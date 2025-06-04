"use client";
import { ArchiveX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { authClient, useSession } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import useSupervisor from "@/hooks/useSupervisor";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	contact: z.string().min(10, "Contact must be at least 10 characters"),
	assignedWard: z.string().min(1, "Assigned ward is required"),
});

type FormData = z.infer<typeof formSchema>;

async function fetchEmployees(setEmployees: any) {
	const users = await authClient.admin.listUsers({
		query: {
			filterField: "role",
			filterOperator: "eq",
			filterValue: "supervisor",
		},
	});
	setEmployees(
		users.data?.users.filter((user: any) => user.banned !== true) || []
	);
}

function EmployeeList({ refetch }: { refetch: boolean }) {
	const { updateSupervisor } = useSupervisor();

	const [employees, setEmployees] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
	const [message, setMessage] = useState("");
	const [isEditMode, setIsEditMode] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			contact: "",
			assignedWard: "",
		},
	});

	useEffect(() => {
		fetchEmployees(setEmployees);
	}, [refetch]);

	useEffect(() => {
		if (selectedEmployee && isEditMode) {
			form.reset({
				name: selectedEmployee.name,
				contact: selectedEmployee.contact,
				assignedWard: selectedEmployee.assignedWard,
			});
		}
	}, [selectedEmployee, isEditMode, form]);

	const onSubmit = async (data: FormData) => {
		try {
			updateSupervisor.mutate({
				id: selectedEmployee.id,
				name: data.name,
				contact: data.contact,
				assignedWard: data.assignedWard,
			});
			toast.success("Employee updated successfully");
			fetchEmployees(setEmployees);
			setOpen(false);
			setIsEditMode(false);
		} catch (error) {
			console.error("Failed to update employee:", error);
			toast.error("Failed to update employee");
		}
	};

	const handleEdit = (employee: any) => {
		setSelectedEmployee(employee);
		setIsEditMode(true);
		setOpen(true);
	};

	const handleDelete = (employee: any) => {
		setSelectedEmployee(employee);
		setIsEditMode(false);
		setOpen(true);
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{isEditMode ? "Edit Employee" : "Delete Employee"}
						</DialogTitle>
						<DialogDescription>
							{isEditMode ? "Update employee details" : ``}
						</DialogDescription>
					</DialogHeader>
					{isEditMode ? (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Enter name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="contact"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contact</FormLabel>
											<FormControl>
												<Input placeholder="Enter contact" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="assignedWard"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Assigned Ward</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<SelectTrigger>
														<SelectValue placeholder="Select ward" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="ward 1">Ward 1</SelectItem>
														<SelectItem value="ward 2">Ward 2</SelectItem>
														<SelectItem value="ward 3">Ward 3</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<DialogFooter>
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<Button type="submit">Save Changes</Button>
								</DialogFooter>
							</form>
						</Form>
					) : (
						<>
							<div className="space-y-4">
								<h2 className="text-lg font-semibold">
									Are you sure you want to delete this employee?
								</h2>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button
									onClick={() =>
										authClient.admin.banUser({
											userId: selectedEmployee.id,
											banReason: "Deleted by admin",
										})
									}>
									Delete
								</Button>
							</DialogFooter>
						</>
					)}
				</DialogContent>
			</Dialog>
			<div className="h-12 rounded-lg px-10 grid lg:grid-cols-5 grid-cols-2 odd:bg-accent">
				<p className="text-sm font-bold flex items-center">Name</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Id</p>
				<p className="text-sm font-bold lg:flex hidden items-center">Contact</p>
				<p className="text-sm font-bold lg:flex hidden items-center">
					Assigned Ward
				</p>
				<p className="text-sm font-bold flex items-center justify-end lg:justify-start">
					Actions
				</p>
			</div>
			{employees.length > 0 ? (
				employees.map((employee, index) => (
					<div
						key={index}
						className="h-12 rounded-lg px-10 grid lg:grid-cols-5 grid-cols-2 odd:bg-accent">
						<p className="text-sm flex font-semibold items-center">
							{employee.name}
						</p>
						<p className="text-sm font-semibold uppercase lg:flex hidden items-center">
							{employee.username}
						</p>
						<p className="text-sm lg:flex hidden items-center">
							{employee.contact}
						</p>
						<p className="text-sm lg:flex hidden items-center capitalize">
							{employee.assignedWard}
						</p>
						<div className="flex items-center justify-end lg:justify-start gap-2">
							<Button
								variant={"outline"}
								onClick={() => handleEdit(employee)}
								className="border-secondary text-secondary"
								size={"sm"}>
								Edit
							</Button>
							{/* <Button
								variant={"outline"}
								onClick={() => handleMessage(employee)}
								className="border-secondary text-secondary"
								size={"sm"}>
								Message
							</Button> */}
							<Button
								variant={"destructive"}
								onClick={() => {
									setSelectedEmployee(employee);
									setOpen(true);
								}}
								className="border-secondary text-secondary text-black"
								size={"sm"}>
								Delete
							</Button>
						</div>
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

export default EmployeeList;
