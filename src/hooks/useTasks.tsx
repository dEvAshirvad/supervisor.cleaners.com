// hooks/useTasks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

interface Speed {
	preprocess: number;
	inference: number;
	postprocess: number;
	total: number;
}

interface ResultsMeta {
	totalImageArea: number;
	totalBoxArea: number;
	areaRatio: string;
	totalGarbagePercentage: string;
	cleanlinessScore: number;
	message: string;
	confidenceScores: number[];
	averageConfidence: string;
	savedImagePath: string;
	speed: Speed;
}

interface SubArea {
	subArea: string;
	beforeImageUrl?: string;
	afterImageUrl?: string;
	beforeResultsMeta?: ResultsMeta;
	afterResultsMeta?: ResultsMeta;
}

interface Assignment {
	name: string;
	wardName: string;
	priority?:
		| "🔥 Highest Priority"
		| "High Priority"
		| "Medium Priority"
		| "Low Priority";
	tasks?: SubArea[];
	status?: "assigned" | "in_progress" | "completed" | "cancelled";
	supervisorName?: string;
	supervisorId: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const axiosConfig: AxiosRequestConfig = { withCredentials: true };
const URL = "http://localhost:3030/api/v1/assignments";

export const useTasks = () => {
	const queryClient = useQueryClient();

	const createAssignment = useMutation({
		mutationFn: (assignment: Assignment) =>
			axios.post(URL, assignment, axiosConfig),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["assignments"] });
		},
	});

	const createSubArea = useMutation({
		mutationFn: ({
			assignmentId,
			subArea,
		}: {
			assignmentId: string;
			subArea: SubArea;
		}) =>
			axios.post(`${URL}/${assignmentId}/sub-areas`, { subArea }, axiosConfig),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["assignments"] });
		},
	});

	const getAssignments = (page = 1, limit = 10, query = {}) =>
		useQuery({
			queryKey: ["assignments", page, limit, query],
			queryFn: () =>
				axios.get(URL, {
					params: { page, limit, ...query },
					...axiosConfig,
				}),
		});

	const getAssignmentByUserId = (page = 1, limit = 10) =>
		useQuery({
			queryKey: ["assignments", "supervisor", page, limit],
			queryFn: () =>
				axios.get(`${URL}/supervisor`, {
					params: { page, limit },
					...axiosConfig,
				}),
		});

	const subAreaPrediction = useMutation({
		mutationFn: ({
			assignmentId,
			subArea,
			stage,
			image,
		}: {
			assignmentId: string;
			subArea: SubArea;
			stage: string;
			image: File;
		}) => {
			const formData = new FormData();
			formData.append("image", image);
			formData.append("subArea", JSON.stringify(subArea));
			formData.append("stage", stage);

			return axios.post(
				`${URL}/${assignmentId}/sub-areas/prediction`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					...axiosConfig,
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["assignments"] });
		},
	});

	return {
		createAssignment,
		createSubArea,
		getAssignments,
		getAssignmentByUserId,
		subAreaPrediction,
	};
};
