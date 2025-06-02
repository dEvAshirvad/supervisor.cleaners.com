"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { Input } from "../ui/input";

const formSchema = z.object({
	taskName: z.string().min(1, "Task name is required"),
	locationId: z.string().min(1, "Location is required"),
	assignedTo: z.string().min(1, "Staff is required"),
	dueDate: z.date({
		required_error: "Due date is required",
	}),
});

interface Location {
	_id: string;
	name: string;
}

interface Staff {
	_id: string;
	name: string;
}

function AddTasksForm({
	className,
	...props
}: React.ComponentProps<"div"> & {
	refetch: () => void;
}) {
	const [locations, setLocations] = useState<Location[]>([]);
	const [staff, setStaff] = useState<Staff[]>([]);
	const [modal, setModel] = useState<boolean>(false);
	const [modalMessageType, setModalMessageType] = useState<
		"success" | "error" | null
	>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			locationId: "",
			assignedTo: "",
		},
	});

	useEffect(() => {
		// Fetch locations
		fetch("http://localhost:3030/api/v1/locations", {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => setLocations(data.data.docs))
			.catch(console.error);

		// Fetch staff
		const users = authClient.admin
			.listUsers({
				query: {
					filterField: "role",
					filterOperator: "eq",
					filterValue: "workers",
				},
			})
			.then((data) =>
				setStaff(
					data.data?.users.map((user) => ({
						_id: user.id,
						name: user.name,
					})) || []
				)
			);
	}, []);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await fetch("http://localhost:3030/api/v1/assignments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					name: values.taskName,
					locationId: values.locationId,
					assignedTo: values.assignedTo,
					dueDate: values.dueDate,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create task");
			}

			setModalMessageType("success");
			setModel(true);
			props.refetch();
		} catch (error) {
			console.error(error);
			setModalMessageType("error");
			setModel(true);
		}
	}

	return (
		locations &&
		staff && (
			<Form {...form}>
				<Dialog open={modal} onOpenChange={setModel}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle
								className={cn(
									modalMessageType === "success"
										? "text-green-500"
										: "text-red-500"
								)}>
								{modalMessageType === "success" ? "Success" : "Error"}
							</DialogTitle>
							<DialogDescription>
								{modalMessageType === "success"
									? "Task has been created successfully"
									: "Something went wrong"}
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant={"outline"}>
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<div className="space-y-10">
					<h1 className="text-2xl font-bold">
						नया कार्य जोड़ें (Add new task)
					</h1>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="taskName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Task Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="locationId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a location" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{locations.map((location) => (
													<SelectItem key={location._id} value={location._id}>
														{location.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="assignedTo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Assign To</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select staff" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{staff.map((person) => (
													<SelectItem key={person._id} value={person._id}>
														{person.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dueDate"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Due Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-full pl-3 text-left font-normal",
															!field.value && "text-muted-foreground"
														)}>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) => date < new Date()}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" size={"lg"} className="w-full">
							Create Task
						</Button>
					</form>
				</div>
			</Form>
		)
	);
}

export default AddTasksForm;
