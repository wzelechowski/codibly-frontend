import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchGenerationMix } from '../api';
import type { GenerationMixResponse } from '../types';

const COLORS: Record<string, string> = {
    wind: '#00C49F', solar: '#FFBB28', nuclear: '#FF8042', hydro: '#0088FE',
    biomass: '#82CA9D', gas: '#FF4444', coal: '#656464', imports: '#8884d8', other: '#A9A9A9'
};

export default function EnergyCharts() {
    const [data, setData] = useState<GenerationMixResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGenerationMix()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading charts...</p>;

    return (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {data.map((dayData) => {
                const chartData = Object.entries(dayData.dailyAverages).map(([name, value]) => ({
                    name,
                    value
                }));

                return (
                    <div key={dayData.date} style={{ textAlign: 'center', width: '300px' }}>
                        <h3>{dayData.date}</h3>
                        <p style={{ fontWeight: 'bold', color: '#2E8B57' }}>
                            Clean energy: {dayData.ecoPercentage}%
                        </p>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label={({ value }) => `${value}%`}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.other} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: any) => [
                                        typeof value === 'number' ? `${value.toFixed(2)}%` : '0%',
                                        'Share'
                                    ]}
                                />
                                <Legend
                                    formatter={(value: string) => value.charAt(0).toUpperCase() + value.slice(1)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                );
            })}
        </div>
    );
}
