"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BrushCleaning, CalendarIcon } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const formSchema = z
	.object({
		startDate: z.date().min(new Date(), {
			message: "Start date must be in the future",
		}),
		endDate: z.date().min(new Date(), {
			message: "End date must be in the future",
		}),
		reportType: z.enum(["staff", "location"]),
		staffId: z.string().optional(),
		locationId: z.string().optional(),
	})
	.superRefine(
		({ startDate, endDate, reportType, staffId, locationId }, ctx) => {
			if (startDate > endDate) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Start date must be before end date",
				});
			}
			if (reportType === "staff" && !staffId) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Staff ID is required",
				});
			}
			if (reportType === "location" && !locationId) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Location ID is required",
				});
			}
		}
	);

function ReportFilterForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			startDate: new Date(),
			endDate: new Date(),
			reportType: "staff",
			staffId: "",
			locationId: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid lg:grid-cols-4 gap-4">
					<FormField
						control={form.control}
						name="startDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Start Date</FormLabel>
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
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>End Date</FormLabel>
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
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					{form.watch("reportType") === "staff" && (
						<FormField
							control={form.control}
							name="staffId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Staff ID</FormLabel>
									<Input {...field} />
								</FormItem>
							)}
						/>
					)}
					{form.watch("reportType") === "location" && (
						<FormField
							control={form.control}
							name="locationId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location ID</FormLabel>
									<Input {...field} />
								</FormItem>
							)}
						/>
					)}
					<div className="flex items-end">
						<Button type="submit" size={"lg"} className="w-full">
							Generate Report
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}

export default ReportFilterForm;
