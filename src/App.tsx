import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard';
import HostGroup from './HostGroup';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <header className="p-4 bg-gray-800">
          <h1 className="text-2xl">Dashboard Zabbix</h1>
        </header>
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hostgroups" element={<HostGroup name={''} hosts={[]} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
