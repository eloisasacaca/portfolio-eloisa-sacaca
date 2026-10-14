import { useQuery } from "@tanstack/react-query";
import { getPortfolioMedia } from "../endpoints/portfolio-media_GET.schema";
export function usePortfolioMedia() {
  return useQuery({
    queryKey: ["portfolio-media"],
    queryFn: ({ signal }) => getPortfolioMedia({ signal }),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
