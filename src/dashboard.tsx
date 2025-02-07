import { useEffect, useState } from "react";
import HostGroup from "./HostGroup"; // Importe o componente HostGroup

const Dashboard = () => {
  const [hostgroups, setHostgroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔄 Carregando dados...");
        const response = await fetch("http://127.0.0.1:5000/api/hostgroups");

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Dados recebidos:", data);
        setHostgroups(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("❌ Erro ao carregar dados:", error.message);
          setError(error.message);
        } else {
          console.error("❌ Erro desconhecido:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-5">⏳ Carregando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (hostgroups.length === 0) return <div className="text-center mt-5">⚠️ Nenhum grupo de hosts encontrado.</div>;

  const nextGroup = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % hostgroups.length);
  };

  const prevGroup = () => {
    setCurrentGroupIndex((prevIndex) =>
      prevIndex === 0 ? hostgroups.length - 1 : prevIndex - 1
    );
  };

  const currentGroup = hostgroups[currentGroupIndex];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Zabbix</h1>

      <div className="flex justify-between items-center">
        <button onClick={prevGroup} className="p-2 bg-gray-300 rounded-lg">⬅️ Anterior</button>

        {/* Renderizando o componente HostGroup */}
        <HostGroup name={currentGroup.name} hosts={currentGroup.hosts} />

        <button onClick={nextGroup} className="p-2 bg-gray-300 rounded-lg">Próximo ➡️</button>
      </div>

      <p className="text-center mt-2">
        Grupo {currentGroupIndex + 1} de {hostgroups.length}
      </p>
    </div>
  );
};

export default Dashboard;
