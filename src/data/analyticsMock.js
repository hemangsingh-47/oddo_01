export const generateFinancialData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month) => {
        const revenue = Math.floor(Math.random() * 500000) + 800000; // 8L - 13L
        const fuelCost = Math.floor(Math.random() * 100000) + 200000; // 2L - 3L
        const maintenance = Math.floor(Math.random() * 50000) + 50000; // 50K - 1L
        const netProfit = revenue - (fuelCost + maintenance);

        // Generate 7-day sparkline mock data
        const sparklineRevenue = Array.from({ length: 7 }, () => Math.floor(revenue / 30) + (Math.random() * 5000 - 2500));
        const sparklineFuel = Array.from({ length: 7 }, () => Math.floor(fuelCost / 30) + (Math.random() * 1000 - 500));

        return {
            month,
            revenue,
            fuelCost,
            maintenance,
            netProfit,
            sparklineRevenue,
            sparklineFuel
        };
    });
};

export const generateEfficiencyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month) => {
        return {
            month,
            fleetAvg: +(Math.random() * (12 - 8) + 8).toFixed(1), // 8 - 12 km/L
            target: 10,
        };
    });
};

export const generateVehicleData = () => {
    return [
        { id: 'TRK-01', type: 'Heavy Truck', milesDriven: 12500, fuelUsed: 1560, status: 'Active' },
        { id: 'TRK-02', type: 'Heavy Truck', milesDriven: 11200, fuelUsed: 1450, status: 'Active' },
        { id: 'VAN-01', type: 'Delivery Van', milesDriven: 8500, fuelUsed: 710, status: 'Active' },
        { id: 'VAN-02', type: 'Delivery Van', milesDriven: 9100, fuelUsed: 780, status: 'Active' },
        { id: 'TRK-03', type: 'Heavy Truck', milesDriven: 0, fuelUsed: 0, status: 'Idle' }, // Idle vehicle example
        { id: 'VAN-03', type: 'Delivery Van', milesDriven: 150, fuelUsed: 18, status: 'Maintenance' },
    ];
};

// Analytics Logic
export const calculateROI = (revenue, costs) => {
    if (costs === 0) return 0;
    return (((revenue - costs) / costs) * 100).toFixed(1);
};

export const calculateUtilization = (vehicles) => {
    if (vehicles.length === 0) return 0;
    const activeVehicles = vehicles.filter(v => v.status === 'Active').length;
    return ((activeVehicles / vehicles.length) * 100).toFixed(0);
};

export const identifyDeadStock = (vehicles) => {
    return vehicles.filter(v => v.status === 'Idle' || v.milesDriven < 500);
};

export const generateActivityFeed = () => {
    return [
        { id: 1, type: 'maintenance', title: 'Scheduled Maintenance Complete', description: 'VAN-03 has completed its 10,000 km service.', time: '2 hours ago', iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
        { id: 2, type: 'alert', title: 'Route Deviation Alert', description: 'TRK-01 detected off planned route by 15km.', time: '4 hours ago', iconColor: 'text-amber-500', bgColor: 'bg-amber-50' },
        { id: 3, type: 'compliance', title: 'Insurance Renewal Due', description: 'Action required for TRK-02 fleet insurance renewal in 5 days.', time: '1 day ago', iconColor: 'text-red-500', bgColor: 'bg-red-50' },
        { id: 4, type: 'system', title: 'Monthly Report Generated', description: 'October Financial Analytics report is ready for download.', time: '2 days ago', iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' }
    ];
};

export const generateAiInsights = () => {
    return [
        { id: 1, title: 'Fuel Cost Anomaly', description: 'Fuel costs increased 14% compared to last month, driven primarily by TRK-01 efficiency drop.', type: 'negative', actionText: 'View Vehicle Details' },
        { id: 2, title: 'Utilization Optimization', description: '3 idle vehicles identified. Reassigning them could improve fleet ROI by an estimated 2.4%.', type: 'warning', actionText: 'Analyze Assignments' },
        { id: 3, title: 'Maintenance Prediction', description: 'VAN-01 and VAN-02 are approaching optimal maintenance windows based on usage patterns.', type: 'info', actionText: 'Schedule Maintenance' },
        { id: 4, title: 'Positive Trend', description: 'Overall fleet net profit is trending 8% higher than the quarterly target.', type: 'positive', actionText: 'View Financials' }
    ];
};
