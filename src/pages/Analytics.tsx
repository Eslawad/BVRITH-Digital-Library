import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, PieChart as PieIcon, Download } from 'lucide-react';

const DATA = [
  { name: 'Q1', actual: 450, target: 400 },
  { name: 'Q2', actual: 520, target: 500 },
  { name: 'Q3', actual: 480, target: 550 },
  { name: 'Q4', actual: 610, target: 600 },
];

const DISTRIBUTION = [
  { name: 'Revenue', value: 40, color: '#3b82f6' },
  { name: 'Ops', value: 25, color: '#10b981' },
  { name: 'Innovation', value: 20, color: '#6366f1' },
  { name: 'Customer', value: 15, color: '#f59e0b' },
];

export default function Analytics() {
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Quarter,Actual,Target\n"
      + DATA.map(r => `${r.name},${r.actual},${r.target}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "performance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Performance Analytics</h1>
          <p className="text-slate-500">Strategic insight into organization-wide achievement</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Over Time */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Target vs Actual Trends
            </h2>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goal Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-indigo-500" />
              Goal Category Distribution
            </h2>
          </div>
          <div className="flex-1 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-2">
              {DISTRIBUTION.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-semibold text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Efficiency */}
        <div className="lg:col-span-2 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
           {/* Abstract Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">Efficiency Insight</h2>
              <p className="text-slate-400 max-w-md">Our current organizational efficiency is trending upward. Manager feedback loops have shortened by <span className="text-blue-400 font-bold">18%</span> compared to the last annual cycle.</p>
              <div className="flex gap-8 border-t border-white/10 pt-6 mt-6">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Check-in Time</p>
                  <p className="text-2xl font-mono">4.2 Days</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Engagement Rate</p>
                  <p className="text-2xl font-mono text-emerald-400">92%</p>
                </div>
              </div>
            </div>
            
            <div className="w-full max-w-xs h-32 bg-white/5 rounded-2xl border border-white/10 p-4 backdrop-blur-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DATA}>
                    <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-2 text-center">Efficiency Velocity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
