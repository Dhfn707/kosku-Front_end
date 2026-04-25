import { useState, useEffect } from "react";
import api from '@/config/axios';

export const useProperties = (searchTerm, selectedCity, selectedType, selectedFacility) => {
  const [properties, setProperties] = useState([]);
  const [metadata, setMetadata] = useState({ cities: [], facilities: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await api.get("/properties/metadata");
        setMetadata(response.data.data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setError("Gagal memuat data filter. Silakan coba lagi nanti.");
      }
    };
    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCity !== "Semua") params.append("city", selectedCity);
        if (selectedType !== "Semua") params.append("type", selectedType);
        if (selectedFacility.length > 0)
          params.append("facilities", selectedFacility.join(","));

        const response = await api.get(`/properties?${params.toString()}`);
        setProperties(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Gagal mengambil daftar kos. Periksa koneksi internet Anda.");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProperties();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCity, selectedType, selectedFacility]);

  return { properties, metadata, isLoading, error };
};
