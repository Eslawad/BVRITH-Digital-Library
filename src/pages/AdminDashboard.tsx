import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Activity, 
  History, 
  AlertTriangle,
  UserPlus,
  RefreshCcw,
  BarChart2,
  FileText,
  Lock,
  Unlock,
  Terminal
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    try {
      const response = await fetch('/api/admin/audit-logs');
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      {/* Admin Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <AdminStat title="Active Nodes" value="1,240" sub="System Capacity: 98%" color="blue" />
         <AdminStat title="Global Delta" value="68%" sub="Avg Completion Rate" color="emerald" />
         <AdminStat title="Bypass Requests" value="24" sub="Pending Security Audit" color="amber" />
         <AdminStat title="Active Breaches" value="00" sub="Zero Threats Detected" color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Audit Log Terminal */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              Intelligence Feed
            </h2>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-pulse">Live Link</span>
               <button onClick={loadAuditLogs} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                 <RefreshCcw className="w-4 h-4" />
               </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-slate-50/50">
            {logs.length === 0 ? (
              <div className="p-20 text-center text-slate-400">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-5" />
                <p className="text-xs font-bold uppercase tracking-widest italic">Zero activity in buffer</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-white border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Event Signature</th>
                    <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
                    <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map(log => (
                    <tr key={log.id} className="hover:bg-white transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                          <span className="font-bold text-slate-900 text-xs">{log.action}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                         <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-100">
                            {log.userId?.substring(0, 12)}
                         </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* System Protocols */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-slate-950 text-white rounded-2xl p-8 shadow-2xl shadow-slate-950/40 relative overflow-hidden flex-1">
             <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/10 blur-[80px] rounded-full" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-indigo-400">Security Protocols</h2>
             
             <div className="space-y-6">
                <ProtocolItem label="Hard-Lock Cycle" status="ACTIVE" active icon={Lock} />
                <ProtocolItem label="Identity Audit" status="STANDBY" icon={Shield} />
                <ProtocolItem label="Maintenance" status="SCHEDULED" icon={RefreshCcw} />
                
                <div className="mt-12 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Cycle Horizon</p>
                   <div className="flex items-end justify-between mb-2">
                      <p className="text-2xl font-display font-black text-indigo-400 italic">2024.1</p>
                      <p className="text-[10px] font-black text-indigo-600 tracking-tighter">84% DEPLOYED</p>
                   </div>
                   <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[84%]" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminStat({ title, value, sub, color }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 -translate-y-1/2 translate-x-1/2 rounded-full",
        color === 'blue' ? 'bg-blue-600' : color === 'emerald' ? 'bg-emerald-600' : color === 'amber' ? 'bg-amber-600' : 'bg-indigo-600'
      )} />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">{title}</p>
      <p className="text-3xl font-display font-black text-slate-950 tracking-tighter italic relative z-10">{value}</p>
      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tight relative z-10 leading-none">{sub}</p>
    </div>
  );
}

function ProtocolItem({ label, status, active, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl group hover:border-indigo-500/50 transition-all cursor-pointer">
       <div className="flex items-center gap-3">
          <Icon className={cn("w-4 h-4", active ? "text-indigo-400" : "text-slate-600")} />
          <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
       </div>
       <span className={cn(
         "text-[9px] font-black px-2 py-0.5 rounded",
         active ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800 text-slate-600"
       )}>{status}</span>
    </div>
  );
}
