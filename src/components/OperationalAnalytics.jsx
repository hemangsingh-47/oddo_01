import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight, TrendingUp, TrendingDown, Activity, DollarSign, Download, Filter, Car, AlertTriangle } from 'lucide-react';
import {
    generateFinancialData,
    generateEfficiencyData,
    generateVehicleData,
    calculateROI,
    calculateUtilization,
    identifyDeadStock
} from '../data/analyticsMock';

const KPICard = ({ title, value, change, changeType, icon: Icon }) => (
    <div className="premium-card p-6 flex flex-col group cursor-default">
        <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors duration-300">
                <Icon className="w-6 h-6 text-primary-600" />
            </div>
            <span className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-full shadow-sm ${changeType === 'positive' ? 'bg-success-500/10 text-success-500 border border-success-500/20' : 'bg-danger-500/10 text-danger-500 border border-danger-500/20'
                }`}>
                {changeType === 'positive' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {change}
            </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">{title}</h3>
        <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</p>
    </div>
);

export default function OperationalAnalytics() {
    const [financialData, setFinancialData] = useState([]);
    const [efficiencyData, setEfficiencyData] = useState([]);
    const [vehicleData, setVehicleData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setFinancialData(generateFinancialData());
            setEfficiencyData(generateEfficiencyData());
            setVehicleData(generateVehicleData());
            setIsLoading(false);
        }, 800);
    }, []);

    const metrics = useMemo(() => {
        if (!financialData.length || !vehicleData.length) return null;

        // Aggregate values
        const currentMonth = financialData[financialData.length - 1];
        const prevMonth = financialData[financialData.length - 2];

        const totalRevenue = currentMonth.revenue;
        const totalCosts = currentMonth.fuelCost + currentMonth.maintenance;

        const prevRevenue = prevMonth.revenue;
        const prevCosts = prevMonth.fuelCost + prevMonth.maintenance;

        const currentROI = calculateROI(totalRevenue, totalCosts);
        const prevROI = calculateROI(prevRevenue, prevCosts);
        const roiChange = (currentROI - prevROI).toFixed(1);

        const utilization = calculateUtilization(vehicleData);

        return {
            totalFuelCost: `Rs. ${(currentMonth.fuelCost / 100000).toFixed(1)} L`,
            fuelCostChange: `${((currentMonth.fuelCost - prevMonth.fuelCost) / prevMonth.fuelCost * 100).toFixed(1)}%`,
            fleetROI: `+${currentROI}%`,
            roiChange: `${roiChange}%`,
            utilizationRate: `${utilization}%`,
            utilizationChange: '+2.5%' // Mocked for simplicity
        };
    }, [financialData, vehicleData]);

    const deadStock = identifyDeadStock(vehicleData);

    const formatCurrency = (value) => `Rs. ${(value / 100000).toFixed(1)} L`;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-900"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Operational Overview</h2>
                    <p className="text-base text-gray-500 mt-2">Monitor key metrics and financial performance across your entire fleet.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-5 py-2.5 glass-panel rounded-xl text-sm font-semibold text-gray-700 hover:bg-white/90 transition-all shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <Filter className="w-4 h-4" /> Filter Data
                    </button>
                    <button className="flex-1 sm:flex-none btn-premium inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold" onClick={() => alert('Exporting Report (Simulation)')}>
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <KPICard
                        title="Total Fuel Cost (Current Month)"
                        value={metrics.totalFuelCost}
                        change={metrics.fuelCostChange}
                        changeType={parseFloat(metrics.fuelCostChange) < 0 ? 'positive' : 'negative'}
                        icon={DollarSign}
                    />
                    <KPICard
                        title="Fleet ROI"
                        value={metrics.fleetROI}
                        change={metrics.roiChange}
                        changeType={parseFloat(metrics.roiChange) > 0 ? 'positive' : 'negative'}
                        icon={ArrowUpRight}
                    />
                    <KPICard
                        title="Utilization Rate"
                        value={metrics.utilizationRate}
                        change={metrics.utilizationChange}
                        changeType="positive"
                        icon={Car}
                    />
                </div>
            )}

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Fuel Efficiency Trend */}
                <div className="premium-card p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Fuel Efficiency Trend (km/L)</h3>
                            <p className="text-sm text-gray-500 mt-1">Comparing fleet average against designated targets</p>
                        </div>
                    </div>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={efficiencyData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', padding: '12px 16px', fontWeight: 600 }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '24px' }} iconType="circle" />
                                <Line type="monotone" dataKey="fleetAvg" name="Fleet Average" stroke="url(#colorUv)" strokeWidth={4} dot={{ r: 5, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                                <Line type="monotone" dataKey="target" name="Target" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="6 6" dot={false} />
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#4f46e5" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue vs Costs */}
                <div className="premium-card p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Monthly Revenue vs Costs</h3>
                            <p className="text-sm text-gray-500 mt-1">Financial distribution over time</p>
                        </div>
                    </div>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={financialData.slice(-6)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} tickFormatter={(val) => `Rs.${val / 100000}L`} />
                                <RechartsTooltip
                                    cursor={{ fill: '#f8fafc', opacity: 0.5 }}
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', padding: '12px 16px', fontWeight: 600 }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '24px' }} iconType="circle" />
                                <Bar dataKey="revenue" name="Revenue" fill="#1e1b4b" radius={[6, 6, 0, 0]} maxBarSize={40} />
                                <Bar dataKey="fuelCost" name="Fuel Cost" fill="#f59e0b" radius={[6, 6, 0, 0]} stackId="costs" maxBarSize={40} />
                                <Bar dataKey="maintenance" name="Maintenance" fill="#ef4444" radius={[6, 6, 0, 0]} stackId="costs" maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Dead Stock Alert */}
            {deadStock.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5 mt-8 shadow-sm flex items-start gap-4 transition-all hover:bg-red-100/50">
                    <div className="bg-red-100 p-2 rounded-full mt-0.5 flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-red-800">Action Required: Dead Stock Detected</h4>
                        <p className="text-sm text-red-700 mt-1.5 leading-relaxed">
                            You have <span className="font-bold">{deadStock.length}</span> vehicle(s) currently marked as Idle or underutilized. Consider analyzing assignment data or remarketing to optimize fleet ROI.
                            <br /><span className="inline-block mt-2 px-2.5 py-1 bg-red-100 rounded-md font-mono text-xs text-red-800 font-bold border border-red-200">Affected units: {deadStock.map(v => v.id).join(', ')}</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Financial Summary Table */}
            <div className="premium-card overflow-hidden mt-8">
                <div className="px-8 py-6 border-b border-gray-100 bg-white/50">
                    <h3 className="text-lg font-bold text-gray-900">Financial Summary by Month</h3>
                    <p className="text-sm text-gray-500 mt-1">Detailed breakdown of revenue and costs</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/80">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fuel Cost</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Maintenance</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Net Profit</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[...financialData].reverse().map((row, index) => (
                                <tr key={index} className="hover:bg-primary-50/50 transition-colors group">
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-900">{row.month}</td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-700">{formatCurrency(row.revenue)}</td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-amber-600 bg-amber-50/30 group-hover:bg-amber-50/80 transition-colors">{formatCurrency(row.fuelCost)}</td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-red-500 bg-red-50/30 group-hover:bg-red-50/80 transition-colors">{formatCurrency(row.maintenance)}</td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-extrabold text-success-500 text-right bg-success-50/20 group-hover:bg-success-50/60 transition-colors">
                                        {formatCurrency(row.netProfit)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
