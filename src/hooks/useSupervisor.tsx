import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = { withCredentials: true };
const URL = "http://localhost:3030/api/v1/supervisors";

const useSupervisor = () => {
	const queryClient = useQueryClient();

	const updateSupervisor = useMutation({
		mutationFn: (supervisor: any) =>
			axios.put(`${URL}/${supervisor.id}`, supervisor, axiosConfig),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["supervisors"] });
		},
	});

	return { updateSupervisor };
};

export default useSupervisor;
