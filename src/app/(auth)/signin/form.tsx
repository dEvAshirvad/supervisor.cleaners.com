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
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
});

export function SigninForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();
	const [modal, setModel] = useState<boolean>(false);
	const [modalMessageType, setModalMessageType] = useState<
		"success" | "error" | null
	>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	useEffect(() => {
		if (modalMessageType && modalMessageType === "success") {
			setTimeout(() => {
				router.push("/");
			}, 2000);
		}
	}, [modalMessageType]);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data = await authClient.signIn.username({
				username: values.username,
				password: values.password,
			});
			if (data.error) {
				throw new Error(data.error.message);
			}
			setModalMessageType("success");
			setModel(true);
		} catch (error) {
			setModalMessageType("error");
			setModel(true);
		}
	}
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
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
								? "You have been signed in successfully"
								: "Something went wrong"}
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col items-center gap-2">
							<a
								href="#"
								className="flex flex-col items-center gap-2 font-medium">
								<div className="flex size-8 items-center justify-center rounded-md">
									<BrushCleaning className="size-6" />
								</div>
								<span className="sr-only">Acme Inc.</span>
							</a>
							<h1 className="text-xl font-bold text-center w-4/5">
								नमस्ते, आपका स्वागत है नगर निगम रायपुर पोर्टल पर
							</h1>
							{/* <div className="text-center text-sm">
							Don&apos;t have an account?{" "}
							<a href="#" className="underline underline-offset-4">
								Conta
							</a>
						</div> */}
						</div>
						<div className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>कर्मचारी आईडी (Employee ID)</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>पासवर्ड (Password)</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Sign in
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
