"use client";
import DashboardCards from "@/components/cards/dashboard-cards";
import AddTasksForm from "@/components/forms/add-tasks-form";
import TasksList from "@/components/list/tasks-list";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import React, { useState } from "react";

function TasksPage() {
	const [refetch, setRefetch] = useState(false);
	return (
		<>
			<PageHeader
				title="टास्क प्रबंधन (Tasks Management)"
				description="स्टाफ और स्थान टास्क बनाएं और देखें (Generate and view staff and location tasks)"
				updatedAt={new Date()}
				refetch={() => setRefetch(!refetch)}
			/>
			<Sheet>
				<SheetTrigger asChild>
					<Button>New Task</Button>
				</SheetTrigger>
				<SheetContent>
					<AddTasksForm refetch={() => setRefetch(!refetch)} />
				</SheetContent>
			</Sheet>
			<DashboardCards
				title="टास्क सूची (Tasks List)"
				onRefresh={() => setRefetch(!refetch)}>
				<TasksList refetch={refetch} />
			</DashboardCards>
		</>
	);
}

export default TasksPage;
