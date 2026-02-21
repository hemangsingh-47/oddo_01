import React, { useState } from 'react';
import StatusBadge from './StatusBadge';

export default function TripRow({ trip, vehicle, driver, dispatchTrip, completeTrip, cancelTrip }) {
    const [endOdo, setEndOdo] = useState('');

    const handleComplete = () => {
        if (!endOdo) {
            alert("Please enter the end odometer reading to complete the trip.");
            return;
        }
        const endV = Number(endOdo);
        if (endV < trip.startOdometer) {
            alert("End odometer cannot be less than start odometer.");
            return;
        }
        completeTrip(trip.id, endV);
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel this trip?")) {
            cancelTrip(trip.id);
        }
    };

    const isCancelled = trip.status === 'Cancelled';
    let distance = '-';
    if (trip.endOdometer !== null) {
        distance = `${trip.endOdometer - trip.startOdometer} mi`;
    }

    return (
        <tr className={`hover:bg-slate-50/50 transition-colors ${isCancelled ? 'opacity-50 grayscale' : ''}`}>
            <td className="font-mono text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                {trip.id.substring(0, 10)}
            </td>
            <td>
                <span className="text-bold-dark">{vehicle ? vehicle.nameModel : 'Unknown Vehicle'}</span>
                <span className="text-muted-small">{driver ? driver.name : 'Unknown Driver'}</span>
            </td>
            <td className="text-bold-dark">
                {trip.cargoWeight?.toLocaleString() || '0'} <span className="text-[10px] text-slate-400 font-bold ml-1">LBS</span>
            </td>
            <td>
                <span className="text-bold-dark">{trip.origin} &rarr; {trip.destination}</span>
                <span className="text-muted-small">Start Odo: {trip.startOdometer} MI</span>
            </td>
            <td>
                <StatusBadge status={trip.status} />
            </td>
            <td className="text-bold-dark">
                {distance}
            </td>
            <td>
                {trip.status === 'Draft' && (
                    <div className="flex gap-2">
                        <button className="btn-secondary-outline hover:bg-primary-50 hover:border-primary-200 uppercase tracking-widest" onClick={() => dispatchTrip(trip.id)}>Dispatch</button>
                        <button className="btn-secondary-outline hover:text-red-600 hover:border-red-200 uppercase tracking-widest" onClick={handleCancel}>Cancel</button>
                    </div>
                )}

                {trip.status === 'Dispatched' && (
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="End Odo"
                            className="w-24 px-3 py-2 bg-slate-50 border-2 border-slate-100 rounded-lg text-xs font-bold focus:outline-none focus:border-primary-500 transition-all"
                            value={endOdo}
                            onChange={e => setEndOdo(e.target.value)}
                        />
                        <button className="btn-secondary-outline hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 uppercase tracking-widest" onClick={handleComplete}>End Trip</button>
                    </div>
                )}

                {(trip.status === 'Completed' || trip.status === 'Cancelled') && (
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic flex items-center gap-1.5 translate-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div> Archived
                    </span>
                )}
            </td>
        </tr>
    );
}
