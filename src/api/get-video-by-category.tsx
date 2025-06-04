import { useEffect, useState } from "react";
import api from "../services/api";

function GetMovieByCategory(categoryId: number) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/videos', {
          params: {
            category: categoryId
          }
        });
        setData(response.data);

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
  return {
    data,
    loading,
    error
  }
}

export default GetMovieByCategory