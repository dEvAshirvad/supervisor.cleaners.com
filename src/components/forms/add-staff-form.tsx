"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BrushCleaning } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient, useSession } from "@/lib/auth-client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().min(2).max(50),
	contact: z.string().min(2).max(50),
	assignedWard: z.string().min(2).max(50),
});

function AddStaffForm({
	className,
	...props
}: React.ComponentProps<"div"> & { refetch: () => void }) {
	const { data: session } = useSession();
	const [modal, setModel] = useState<boolean>(false);
	const [modalMessageType, setModalMessageType] = useState<
		"success" | "error" | null
	>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			contact: "",
			assignedWard: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const generateUsername = Math.floor(
				1000000000 + Math.random() * 9000000000
			);
			const username = `clwr${generateUsername}`;
			const data = await authClient.admin.createUser({
				name: values.name,
				email: values.email,
				password: values.email,
				data: {
					contact: values.contact,
					username: username,
					displayUsername: username,
					assignedWard: values.assignedWard,
					createdBy: session?.user?.id.toString(),
				},
				role: "supervisor",
			});
			setModalMessageType("success");
			setModel(true);
			props.refetch();
			if (data.error) {
				throw new Error(data.error.message);
			}
		} catch (error) {
			console.error(error);
			setModalMessageType("error");
			setModel(true);
		}
	}
	return (
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
								? "Supervisor has been added successfully"
								: "Something went wrong"}
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid lg:grid-cols-3 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
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
									<Input {...field} />
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
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Select Ward" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ward 1">Ward 1</SelectItem>
											<SelectItem value="ward 2">Ward 2</SelectItem>
											<SelectItem value="ward 3">Ward 3</SelectItem>
											<SelectItem value="ward 4">Ward 4</SelectItem>
											<SelectItem value="ward 5">Ward 5</SelectItem>
											<SelectItem value="ward 6">Ward 6</SelectItem>
											<SelectItem value="ward 7">Ward 7</SelectItem>
											<SelectItem value="ward 8">Ward 8</SelectItem>
											<SelectItem value="ward 9">Ward 9</SelectItem>
											<SelectItem value="ward 10">Ward 10</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" size={"lg"} className="lg:w-fit w-full">
					Add Supervisor
				</Button>
			</form>
		</Form>
	);
}

export default AddStaffForm;
