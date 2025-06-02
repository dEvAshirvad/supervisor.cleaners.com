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
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
	title: z.string().min(2).max(50),
	address: z.string().min(2).max(200),
});

function AddLocationForm({
	className,
	...props
}: React.ComponentProps<"div"> & {
	refetch: () => void;
	type: "add" | "edit";
	area: any;
}) {
	const { data: session } = useSession();
	const [modal, setModel] = useState<boolean>(false);
	const [modalMessageType, setModalMessageType] = useState<
		"success" | "error" | null
	>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: props.type === "add" ? "" : props.area.name,
			address: props.type === "add" ? "" : props.area.address,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await fetch(
				`http://localhost:3030/api/v1/locations/${
					props.type === "add" ? "" : props.area._id
				}`,
				{
					method: props.type === "add" ? "POST" : "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						name: values.title,
						address: values.address,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to save location");
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
								? `Location has been ${
										props.type === "add" ? "added" : "updated"
								  } successfully`
								: "Something went wrong"}
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<div className="space-y-10">
				{props.type === "add" && (
					<h1 className="text-2xl font-bold">
						नया क्षेत्र जोड़ें (Add new area)
					</h1>
				)}
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" size={"lg"} className="w-full">
						{props.type === "add" ? "Add Location" : "Update Location"}
					</Button>
				</form>
			</div>
		</Form>
	);
}

export default AddLocationForm;
