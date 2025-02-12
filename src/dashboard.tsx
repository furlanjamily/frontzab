import { useEffect, useState } from "react";

type HostStatus = {
  ip: string;
  status: string;
};

export default function Dashboard() {
  const [hosts, setHosts] = useState<HostStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:5000/api/hosts");
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
      }
      const data: HostStatus[] = await response.json();
      setHosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Atualiza a cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Monitoramento de Hosts</h1>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hosts.map((host, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${
              host.status === "Online" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <p className="text-lg font-semibold">{host.ip}</p>
            <p>Status: {host.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
