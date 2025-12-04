import { useMemo, useState } from "react";
import { Business } from "../types/business";
import { businessesService } from "../services/businesses";
import { useQuery } from "@tanstack/react-query";
import {
  getLocalBusinesses,
  saveLocalBusinesses,
} from "../services/local/businesses";
import { OfflineError } from "../utils/local-db";

export const useFetchBusinesses = () => {
  const [searchText, setSearchText] = useState("");
  const [isOffline, setIsOffline] = useState(false);

  const {
    data: businesses = [],
    isLoading,
    error,
  } = useQuery<Business[], Error>({
    queryKey: ["businesses", navigator.onLine],
    queryFn: async () => {
      try {
        const isOnline = navigator.onLine

        if (!isOnline) throw new OfflineError();

        const response = await businessesService.getBusinesses();
        await saveLocalBusinesses(response);
        setIsOffline(false);
        return response;
      } catch (error) {
        const cached = await getLocalBusinesses();

        if (cached.length > 0) {
          setIsOffline(true);
          return cached;
        }

        if (error instanceof OfflineError) {
          throw new Error("Sin conexión a internet");
        }

        throw new Error("No fue posible obtener la información");
      }
    },
    retry: false,
    networkMode: 'always'
  });

  const filtered = useMemo(() => {
    if (!searchText.trim()) return businesses;

    return businesses.filter(
      (business) =>
        business.name.toLowerCase().includes(searchText.toLowerCase()) ||
        business.business_categories.category
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
  }, [searchText, businesses]);

  return {
    filtered,
    isLoading,
    error: error?.message || null,
    isOffline,
    searchText,
    setSearchText,
  };
};
