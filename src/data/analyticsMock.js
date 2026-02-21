export const generateFinancialData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month) => {
        const revenue = Math.floor(Math.random() * 500000) + 800000; // 8L - 13L
        const fuelCost = Math.floor(Math.random() * 100000) + 200000; // 2L - 3L
        const maintenance = Math.floor(Math.random() * 50000) + 50000; // 50K - 1L
        const netProfit = revenue - (fuelCost + maintenance);

        return {
            month,
            revenue,
            fuelCost,
            maintenance,
            netProfit
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
