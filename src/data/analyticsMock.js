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

export const generateDriverData = () => {
    return [
        { id: 'devashya', name: 'Devashya', license: 'DL-23223', expiry: '22/3/25', completionRate: 92, safetyScore: 89, complaints: 4, status: 'On Duty', assignedVehicle: 'TRK-01' },
        { id: 'cuddly_zebra', name: 'Cuddly Zebra', license: 'DL-84721', expiry: '14/8/26', completionRate: 97, safetyScore: 94, complaints: 1, status: 'Off Duty', assignedVehicle: null },
        { id: 'decisive_porcupine', name: 'Decisive Porcupine', license: 'DL-55829', expiry: '05/11/24', completionRate: 88, safetyScore: 82, complaints: 3, status: 'On Duty', assignedVehicle: 'VAN-02' },
        { id: 'advanced_falcon', name: 'Advanced Falcon', license: 'DL-11934', expiry: '19/2/25', completionRate: 95, safetyScore: 91, complaints: 0, status: 'On Duty', assignedVehicle: 'TRK-02' },
        { id: 'innocent_lion', name: 'Innocent Lion', license: 'DL-77382', expiry: '30/5/27', completionRate: 85, safetyScore: 78, complaints: 5, status: 'Suspended', assignedVehicle: null },
        { id: 'venerated_starling', name: 'Venerated Starling', license: 'DL-99210', expiry: '12/12/24', completionRate: 99, safetyScore: 98, complaints: 0, status: 'On Duty', assignedVehicle: 'VAN-01' },
        { id: 'kartik_joshi', name: 'Kartik Joshi', license: 'DL-44123', expiry: '08/7/25', completionRate: 91, safetyScore: 86, complaints: 2, status: 'Off Duty', assignedVehicle: null },
        { id: 'vishv_26', name: 'Vishv_26', license: 'DL-66591', expiry: '25/9/26', completionRate: 94, safetyScore: 92, complaints: 1, status: 'On Duty', assignedVehicle: 'TRK-03' }
    ];
};

export const generateDriverHistory = (driverId) => {
    // Generate a generic timeline suitable for any driver for demo purposes
    return [
        { id: 101, date: 'Today, 09:42 AM', type: 'compliance', title: 'Pre-trip Inspection Passed', description: 'Vehicle checked and logged with 0 defects.', iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
        { id: 102, date: 'Yesterday, 14:15 PM', type: 'alert', title: 'Hard Braking Event', description: 'Decelerated > 15 mph/s on Route 82. Speed reduced to 45mph.', iconColor: 'text-amber-500', bgColor: 'bg-amber-50' },
        { id: 103, date: 'Oct 12, 08:00 AM', type: 'system', title: 'Shift Started', description: 'Logged on duty and assigned to TRK-01.', iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
        { id: 104, date: 'Oct 05, 16:30 PM', type: 'compliance', title: 'Safety Training Completed', description: 'Passed quarterly defensive driving module (Score: 95%).', iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
        { id: 105, date: 'Sep 28, 11:10 AM', type: 'alert', title: 'Speeding Violation (Minor)', description: 'Exceeded posted speed limit by 8mph for 2 minutes.', iconColor: 'text-amber-500', bgColor: 'bg-amber-50' }
    ];
};
