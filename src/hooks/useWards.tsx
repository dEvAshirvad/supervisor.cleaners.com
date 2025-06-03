// hooks/useWards.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

interface Ward {
	name: string;
	address: string;
	assignedSupervisor?: string;
}

const axiosConfig: AxiosRequestConfig = { withCredentials: true };
const URL = "http://localhost:3030/api/v1/wards";

export const useWards = () => {
	const queryClient = useQueryClient();

	const createWard = useMutation({
		mutationFn: (ward: Ward) => axios.post(URL, ward, axiosConfig),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wards"] });
		},
	});

	const createWardBulk = useMutation({
		mutationFn: (wards: Ward[]) =>
			axios.post(`${URL}/bulk`, { wards }, axiosConfig),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wards"] });
		},
	});

	const getWards = () =>
		useQuery({
			queryKey: ["wards"],
			queryFn: () => axios.get<Ward[]>(URL, axiosConfig),
		});

	const getWardById = (id: string) =>
		useQuery({
			queryKey: ["wards", id],
			queryFn: () => axios.get<Ward>(`${URL}/${id}`, axiosConfig),
			enabled: !!id,
		});

	const updateWard = useMutation({
		mutationFn: ({ id, ward }: { id: string; ward: Ward }) =>
			axios.put(`${URL}/${id}`, ward, axiosConfig),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wards"] });
		},
	});

	return {
		createWard,
		createWardBulk,
		getWards,
		getWardById,
		updateWard,
	};
};
