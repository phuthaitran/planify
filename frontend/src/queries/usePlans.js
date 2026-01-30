import { useQuery } from "@tanstack/react-query"
import { getAllPlans } from "../api/plan";

export const usePlans = () => {
	return useQuery({
		queryKey: ['plans'],
		queryFn: async() => {
			const res = await getAllPlans();
			return res.data.result;
		},
		staleTime: 5 * 60 * 1000
	});
};