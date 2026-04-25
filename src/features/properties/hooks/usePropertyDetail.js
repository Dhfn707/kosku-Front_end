import { useState, useEffect } from "react";
import api from '@/config/axios';

export const usePropertyDetail = (id) => {
  const [kos, setKos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/properties/${id}`);
        setKos(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.response?.data?.message || "Gagal mengambil data properti");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { kos, loading, error };
};
