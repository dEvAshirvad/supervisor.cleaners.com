// hooks/useLocations.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

interface Location {
	name: string;
	description?: string;
	address?: string;
	city?: string;
	state?: string;
	zip?: number;
	assignedWard: string;
	latitude?: number;
	longitude?: number;
}

interface PaginatedResponse<T> {
	docs: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

const axiosConfig: AxiosRequestConfig = { withCredentials: true };
const URL = "http://localhost:3030/api/v1/locations";

export const useLocations = () => {
	const queryClient = useQueryClient();

	const createLocation = useMutation({
		mutationFn: (location: Location) => axios.post(URL, location, axiosConfig),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["locations"] });
		},
	});

	const getLocations = (page = 1, limit = 10, query = {}) =>
		useQuery({
			queryKey: ["locations", page, limit, query],
			queryFn: () =>
				axios.get<PaginatedResponse<Location>>(URL, {
					params: { page, limit, ...query },
					...axiosConfig,
				}),
		});

	const getLocationById = (id: string) =>
		useQuery({
			queryKey: ["locations", id],
			queryFn: () => axios.get<Location>(`${URL}/${id}`, axiosConfig),
			enabled: !!id,
		});

	const getLocationByUserId = (page = 1, limit = 10) =>
		useQuery({
			queryKey: ["locations", "user", page, limit],
			queryFn: () =>
				axios.get<PaginatedResponse<Location>>(`${URL}/user`, {
					params: { page, limit },
					...axiosConfig,
				}),
		});

	const getLocationByWardName = (wardName: string, page = 1, limit = 20) =>
		useQuery({
			queryKey: ["locations", "ward", wardName, page, limit],
			queryFn: () =>
				axios.get<PaginatedResponse<Location>>(`${URL}/ward/${wardName}`, {
					params: { page, limit },
					...axiosConfig,
				}),
			enabled: !!wardName,
		});

	const getLocationHistory = (name: string, page = 1, limit = 20) =>
		useQuery({
			queryKey: ["locations", "history", name, page, limit],
			queryFn: () =>
				axios.get<PaginatedResponse<Location>>(`${URL}/${name}/history`, {
					params: { page, limit },
					...axiosConfig,
				}),
			enabled: !!name,
		});

	const getLocationByZipCode = (zipCode: number, page = 1, limit = 10) =>
		useQuery({
			queryKey: ["locations", "zip", zipCode, page, limit],
			queryFn: () =>
				axios.get<PaginatedResponse<Location>>(`${URL}/zip/${zipCode}`, {
					params: { page, limit },
					...axiosConfig,
				}),
			enabled: !!zipCode,
		});

	const deleteLocation = useMutation({
		mutationFn: (id: string) => axios.delete(`${URL}/${id}`, axiosConfig),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["locations"] });
		},
	});

	return {
		createLocation,
		getLocations,
		getLocationById,
		getLocationByUserId,
		getLocationByWardName,
		getLocationHistory,
		getLocationByZipCode,
		deleteLocation,
	};
};
