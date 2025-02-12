type HostGroupProps = {
  name: string;
  hosts: { name: string; ip: string; status: string }[];
};

const HostGroup = ({ name, hosts }: HostGroupProps) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold">{name}</h2>
      <ul className="mt-4">
        {hosts.map((host, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <div className="flex items-center">
              <div className="font-semibold">{host.name}</div>
              <span className="ml-2 text-sm text-gray-500">{host.ip}</span>
            </div>
            <span
              className={`${
                host.status === "Online" ? "text-green-500" : "text-red-500"
              } font-bold`}
            >
              {host.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostGroup;
