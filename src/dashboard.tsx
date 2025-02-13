import { useEffect, useState } from "react";

type HostStatus = {
  ip: string;
  status: string;
  group: string;
  name: string;
};

export default function Dashboard() {
  const [hosts, setHosts] = useState<Record<string, HostStatus[]>>({});
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0);
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
      const data: Record<string, HostStatus[]> = await response.json();
      setHosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNextGroup = () => {
    if (hosts && Object.keys(hosts).length > 0) {
      setCurrentGroupIndex((prev) => (prev + 1) % Object.keys(hosts).length);
    }
  };

  const handlePreviousGroup = () => {
    if (hosts && Object.keys(hosts).length > 0) {
      setCurrentGroupIndex((prev) => (prev - 1 + Object.keys(hosts).length) % Object.keys(hosts).length);
    }
  };

  const groupKeys = Object.keys(hosts);
  const currentGroupName = groupKeys[currentGroupIndex];
  const currentGroupHosts = hosts[currentGroupName] || [];

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Monitoramento de Hosts</h1>
      {loading && <p className="text-center text-gray-600">Carregando...</p>}
      {error && <p className="text-center text-red-500">Erro: {error}</p>}

      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePreviousGroup} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
          Anterior
        </button>
        <h2 className="text-xl font-semibold text-gray-700">
          Grupo {currentGroupIndex + 1} de {groupKeys.length}: {currentGroupName}
        </h2>
        <button onClick={handleNextGroup} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
          Próximo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentGroupHosts.map((host, index) => (
          <div
            key={index}
            className={`p-5 rounded-lg shadow-md border-l-4 ${
              host.status === "Online" ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
            }`}
          >
            <p className="text-lg font-semibold text-gray-700">{host.name} ({host.ip})</p>
            <p className="text-gray-600">Status: <span className={`font-bold ${host.status === "Online" ? "text-green-600" : "text-red-600"}`}>{host.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
