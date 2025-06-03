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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useReport } from "@/hooks/useReport";
import { useEffect, useState } from "react";

const formSchema = z
	.object({
		reportType: z.enum(["full", "wardwise"]),
		reportDateRange: z.enum(["datewise", "weekwise", "monthwise"]),
		month: z.number().min(1).max(12).optional(),
		startDate: z.date().optional(),
		endDate: z.date().optional(),
		date: z.date().optional(),
		locationId: z.string().optional(),
	})
	.superRefine(
		(
			{
				startDate,
				endDate,
				reportType,
				reportDateRange,
				month,
				date,
				locationId,
			},
			ctx
		) => {
			if (reportDateRange === "weekwise") {
				if (!startDate) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Start date is required for week wise report",
						path: ["startDate"],
					});
				}
				if (!endDate) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "End date is required for week wise report",
						path: ["endDate"],
					});
				}
				if (startDate && endDate && startDate > endDate) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Start date must be before end date",
						path: ["startDate"],
					});
				}
			}

			if (reportDateRange === "datewise" && !date) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Date is required for date wise report",
					path: ["date"],
				});
			}

			if (reportType === "wardwise" && !locationId) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Location ID is required for ward wise report",
					path: ["locationId"],
				});
			}
		}
	);

export type ReportFormData = z.infer<typeof formSchema>;

function ReportFilterForm({ generateReport }: { generateReport: any }) {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			startDate: undefined,
			endDate: undefined,
			reportType: "full",
			reportDateRange: "datewise",
			date: new Date(),
			month: undefined,
			locationId: "",
		},
	});

	const reportType = form.watch("reportType");
	const reportDateRange = form.watch("reportDateRange");

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			generateReport.mutate(values);
		} catch (error) {
			console.error("Failed to generate report:", error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid lg:grid-cols-4 gap-4">
					<FormField
						control={form.control}
						name="reportType"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>Report Type</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1">
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="full" />
											</FormControl>
											<FormLabel className="font-normal">Full Report</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="wardwise" />
											</FormControl>
											<FormLabel className="font-normal">Ward Wise</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="reportDateRange"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>Date Range</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1">
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="datewise" />
											</FormControl>
											<FormLabel className="font-normal">Date Wise</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="weekwise" />
											</FormControl>
											<FormLabel className="font-normal">Week Wise</FormLabel>
										</FormItem>
										{/* <FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="monthwise" />
											</FormControl>
											<FormLabel className="font-normal">Month Wise</FormLabel>
										</FormItem> */}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{reportDateRange === "datewise" && (
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date</FormLabel>
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
					)}
					{reportDateRange === "weekwise" && (
						<>
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
						</>
					)}
					{reportDateRange === "monthwise" && (
						<FormField
							control={form.control}
							name="month"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Month</FormLabel>
									<Select
										onValueChange={(value) => field.onChange(parseInt(value))}
										defaultValue={field.value?.toString()}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select month" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Array.from({ length: 12 }, (_, i) => (
												<SelectItem key={i + 1} value={(i + 1).toString()}>
													{format(new Date(2024, i, 1), "MMMM")}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{reportType === "wardwise" && (
						<FormField
							control={form.control}
							name="locationId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location ID</FormLabel>
									<Input {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>
				<div className="flex items-end">
					<Button
						type="submit"
						size={"lg"}
						className="w-full"
						disabled={isLoading}>
						{isLoading ? "Generating..." : "Generate Report"}
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default ReportFilterForm;
