import { useEffect, useState } from "react";
import api from "../services/api";

interface Category {
  id: string;
  title: string;
  site_id: number;
}

function GetCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Category[]>('/categories');
        setData(response.data);
        setError(null);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setError(`Falha ao carregar categorias: ${message}`);
        console.error("GetCategories error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default GetCategories;