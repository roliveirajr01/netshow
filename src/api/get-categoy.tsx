import { useEffect, useState } from "react";
import api from "../services/api";
import type { Category } from "../models/categories";

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