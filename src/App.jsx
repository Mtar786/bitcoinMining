import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Zap, Server, Shield, Activity, DollarSign, Pickaxe, Info, Play, Pause } from 'lucide-react';

export default function BitcoinMiner() {
  // Game State
  const [balance, setBalance] = useState(0.00000000); // BTC
  const [cash, setCash] = useState(0); // USD
  const [hashRate, setHashRate] = useState(0); // H/s (Hashes per second)
  const [blocksMined, setBlocksMined] = useState(0);
  const [btcPrice, setBtcPrice] = useState(45000); // Dynamic simulated price
  const [marketTrend, setMarketTrend] = useState(1); // 1 = up, -1 = down

  // Mining Logic State
  const [currentHash, setCurrentHash] = useState('00000000000000000000000000000000');
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  // Equipment Inventory
  const [inventory, setInventory] = useState({
    cpu: 0,
    gpu: 0,
    asic: 0,
    farm: 0
  });

  // Shop Data
  const upgrades = [
    { id: 'cpu', name: 'Old Laptop CPU', cost: 150, rate: 10, icon: <Cpu size={20} />, desc: 'Basic mining. Better than nothing.' },
    { id: 'gpu', name: 'Gaming GPU', cost: 1200, rate: 150, icon: <Activity size={20} />, desc: 'High-end graphics card for parallel hashing.' },
    { id: 'asic', name: 'AntMiner S19', cost: 5000, rate: 800, icon: <Server size={20} />, desc: 'Specialized hardware built for SHA-256.' },
    { id: 'farm', name: 'Mining Container', cost: 25000, rate: 5000, icon: <Zap size={20} />, desc: 'An industrial shipping container full of rigs.' },
  ];

  // --- Game Loop (1s tick) ---
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Calculate Earnings based on HashRate
      // Simulating difficulty: 1,000,000 hashes = 1 BTC (Very simplified for gameplay)
      const difficulty = 10000000;
      const btcEarned = hashRate / difficulty;

      if (hashRate > 0) {
        setBalance(prev => prev + btcEarned);

        // Randomly "find a block" visuals
        if (Math.random() < (hashRate / 100000)) {
           addLog(`BLOCK FOUND! Reward: 6.25 BTC (Simulated share)`);
           setBlocksMined(prev => prev + 1);
        }
      }

      // 2. Market Fluctuations
      if (Math.random() > 0.8) {
        const volatility = 500;
        const change = Math.random() * volatility * (Math.random() > 0.5 ? 1 : -1);
        setBtcPrice(prev => Math.max(1000, Math.floor(prev + change)));
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [hashRate]);

  // --- Visual Hashing Effect (Fast tick) ---
  useEffect(() => {
    if (hashRate === 0) return;

    const hashInterval = setInterval(() => {
      // Generate fake hex strings to simulate work
      const chars = '0123456789abcdef';
      let result = '';
      for (let i = 0; i < 32; i++) result += chars[Math.floor(Math.random() * 16)];
      setCurrentHash(result);
    }, 100);

    return () => clearInterval(hashInterval);
  }, [hashRate]);

  // Scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // --- Actions ---

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-19), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const manualMine = () => {
    // Clicker mechanic
    const clickPower = 0.00000050;
    setBalance(prev => prev + clickPower);
    setCurrentHash('m4nu4l' + Math.random().toString(36).substring(7));

    // Chance to add log
    if (Math.random() > 0.7) {
        addLog(`Manual hash verified. Nonce: ${Math.floor(Math.random()*999999)}`);
    }
  };

  const buyUpgrade = (id) => {
    const item = upgrades.find(u => u.id === id);
    if (cash >= item.cost) {
      setCash(prev => prev - item.cost);
      setInventory(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHashRate(prev => prev + item.rate);
      addLog(`System Upgraded: Purchased ${item.name}`);
    } else {
      addLog(`ERROR: Insufficient funds for ${item.name}`);
    }
  };

  const sellCrypto = () => {
    if (balance <= 0) return;
    const value = balance * btcPrice;
    setCash(prev => prev + value);
    setBalance(0);
    addLog(`SOLD: Exchanged mining rewards for $${value.toFixed(2)} USD`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-cyan-400 font-mono p-4 md:p-8 flex flex-col gap-6 selection:bg-cyan-900 selection:text-white">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center border-b border-cyan-800 pb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/30">
            <Pickaxe size={32} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-white">GENESIS<span className="text-cyan-500">MINER</span></h1>
            <div className="flex items-center gap-2 text-xs text-cyan-600">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              NETWORK ACTIVE
            </div>
          </div>
        </div>

        <div className="flex gap-6 text-sm">
          <div className="text-right">
            <p className="text-slate-400">BTC Price</p>
            <p className="text-white font-bold">${btcPrice.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400">Network Difficulty</p>
            <p className="text-white font-bold">48.2 T</p>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">

        {/* LEFT COLUMN: MINING OPERATIONS */}
        <section className="flex flex-col gap-6">

          {/* Dashboard */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-800 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={120} />
            </div>
            <h2 className="text-slate-400 text-sm uppercase tracking-widest mb-1">Total Hashrate</h2>
            <div className="text-4xl font-bold text-white mb-4">
              {hashRate.toLocaleString()} <span className="text-lg text-cyan-500 font-normal">H/s</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-3 rounded border border-cyan-900">
                <p className="text-xs text-slate-500">Active Rigs</p>
                <p className="text-xl font-bold text-white">
                  {Object.values(inventory).reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded border border-cyan-900">
                <p className="text-xs text-slate-500">Blocks Found</p>
                <p className="text-xl font-bold text-white">{blocksMined}</p>
              </div>
            </div>
          </div>

          {/* Manual Mine Button */}
          <button
            onClick={manualMine}
            className="group relative w-full bg-gradient-to-r from-cyan-700 to-blue-700 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl p-8 transition-all active:scale-95 shadow-lg shadow-cyan-900/20 border-t border-white/10"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
            <div className="relative flex flex-col items-center gap-3">
              <Pickaxe size={48} className="group-hover:-rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-bold tracking-widest">MINE BLOCK</span>
              <span className="text-xs opacity-70">Click to execute SHA-256 algorithm manually</span>
            </div>
          </button>

          {/* Wallet */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-yellow-900/50 shadow-lg">
            <h2 className="text-yellow-600 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <DollarSign size={16} /> Wallet Balance
            </h2>
            <div className="flex flex-col gap-1 mb-6">
              <div className="text-3xl font-mono text-white break-all">
                {balance.toFixed(8)} <span className="text-yellow-500">BTC</span>
              </div>
              <div className="text-sm text-slate-400">
                ≈ ${(balance * btcPrice).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} USD
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500 uppercase mb-1">Liquid Funds</p>
                <p className="text-2xl text-green-400 font-bold">${cash.toLocaleString()}</p>
              </div>
              <button
                onClick={sellCrypto}
                disabled={balance <= 0}
                className="bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-green-400/30"
              >
                SELL ALL BTC
              </button>
            </div>
          </div>

        </section>

        {/* CENTER COLUMN: TERMINAL & VISUALS */}
        <section className="flex flex-col gap-6 lg:h-full">

          {/* Live Hash Visualizer */}
          <div className="bg-black rounded-xl border border-slate-700 p-4 font-mono text-xs overflow-hidden relative">
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <p className="text-slate-500 mb-2">// SHA-256 WORKER POOL</p>
            <div className="flex flex-col gap-1 text-slate-300 opacity-80">
              <div className="flex gap-4">
                <span className="text-purple-400">TARGET:</span>
                <span>000000000019d6689c085ae165831e93...</span>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-400">NONCE:</span>
                <span>{Math.floor(Math.random() * 999999999)}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-green-400">HASH:</span>
                <span className="break-all text-slate-500">{currentHash}</span>
              </div>
            </div>
            <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (hashRate / 100))}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-right text-slate-500 mt-1">LOAD: {(hashRate / 50).toFixed(1)}%</p>
          </div>

          {/* System Log */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex-1 font-mono text-xs overflow-hidden flex flex-col min-h-[300px]">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
              <Terminal size={14} className="text-slate-400"/>
              <span className="text-slate-400">miner_logs.txt</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
              <div className="text-slate-500">System initialized... awaiting commands.</div>
              {logs.map((log, i) => (
                <div key={i} className="text-cyan-300/80 border-l-2 border-cyan-900/50 pl-2">
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: MARKETPLACE */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Server className="text-cyan-500" size={20} />
            <h2 className="font-bold text-white tracking-wider">HARDWARE MARKET</h2>
          </div>

          <div className="flex flex-col gap-3">
            {upgrades.map((item) => {
              const canAfford = cash >= item.cost;
              return (
                <button
                  key={item.id}
                  onClick={() => buyUpgrade(item.id)}
                  className={`relative overflow-hidden flex items-center gap-4 p-4 rounded-xl border transition-all text-left group
                    ${canAfford
                      ? 'bg-slate-800 border-slate-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-900/20'
                      : 'bg-slate-900 border-slate-800 opacity-60 cursor-not-allowed'
                    }`}
                >
                  <div className={`p-3 rounded-lg ${canAfford ? 'bg-cyan-900/30 text-cyan-400' : 'bg-slate-800 text-slate-600'}`}>
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-200">{item.name}</h3>
                      <span className="text-xs bg-black/30 px-2 py-1 rounded text-slate-400">
                        Qty: {inventory[item.id]}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{item.desc}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className={`${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                        ${item.cost.toLocaleString()}
                      </span>
                      <span className="text-cyan-600 text-xs">+{item.rate} H/s</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-auto bg-blue-900/20 p-4 rounded-xl border border-blue-500/20 text-xs text-blue-200 flex gap-3">
            <Info size={32} className="shrink-0 text-blue-400" />
            <p>
              <strong>Educational Simulation Only:</strong> This app does not actually mine cryptocurrency.
              No CPU resources are used for hashing algorithms. All "BTC" and funds shown are virtual and have no real-world value.
            </p>
          </div>
        </section>

      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}</style>
    </div>
  );
}