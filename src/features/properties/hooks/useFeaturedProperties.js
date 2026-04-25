import { useState, useEffect } from "react";
import api from '@/config/axios';

export const useFeaturedProperties = () => {
  const [kosData, setKosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKos = async () => {
      try {
        setLoading(true);
        const response = await api.get("/properties/featured");
        const data = response.data.data || [];
        setKosData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching featured kos:", err);
        setError("Gagal memuat data kos. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchKos();
  }, []);

  return { kosData, loading, error };
};
