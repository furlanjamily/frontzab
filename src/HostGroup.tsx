import React from "react";

interface Host {
  hostid: string;
  name: string;
  host: string;
  ping_status: string;
}

interface HostGroupProps {
  name: string;
  hosts: Host[];
}

const HostGroup: React.FC<HostGroupProps> = ({ name, hosts }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      {hosts && hosts.length > 0 ? (
        <ul>
          {hosts.map((host) => (
            <li key={host.hostid} className="border-b py-1">
              {host.name} ({host.host}) - Status:{" "}
              <span
                className={`font-semibold ${
                  host.ping_status === "online" ? "text-green-500" : "text-red-500"
                }`}
              >
                {host.ping_status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhum host disponível.</p>
      )}
    </div>
  );
};

export default HostGroup;
