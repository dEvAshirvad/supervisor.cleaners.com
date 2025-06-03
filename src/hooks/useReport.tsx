import { ReportFormData } from "@/components/forms/report-filter-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = { withCredentials: true };
const URL = "http://localhost:3030/api/v1/reports";

export const useReport = () => {
	const queryClient = useQueryClient();
	const generateReport = useMutation({
		mutationFn: async (params: ReportFormData) => {
			const response = await axios.post(
				`${URL}/generate-report`,
				params,
				axiosConfig
			);
			return response.data;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["reports"] });
		},
	});
	return {
		generateReport,
		report: generateReport.data?.data,
		type: generateReport.data?.type,
		isLoading: generateReport.isPending,
		error: generateReport.error,
	};
};
