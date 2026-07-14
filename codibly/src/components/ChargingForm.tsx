import { useState } from 'react';
import * as React from "react";
import { fetchOptimalWindow } from '../api';
import type { OptimalChargingWindowResponse } from '../types';

export default function ChargingForm() {
    const [hours, setHours] = useState<number>(1);
    const [result, setResult] = useState<OptimalChargingWindowResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await fetchOptimalWindow(hours);
            setResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '3rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Find Optimal Charging Window</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '1rem' }}>
                    Charging duration: <strong>{hours}h</strong>
                    <input
                        type="range"
                        min="1"
                        max="6"
                        step="1"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                </label>
                <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    {loading ? 'Calculating...' : 'Search'}
                </button>
            </form>

            {result && (
                <div style={{ backgroundColor: '#16171d', padding: '1rem', borderRadius: '4px', color: 'white' }}>
                    <p><strong>Start:</strong> {new Date(result.from).toLocaleString()}</p>
                    <p><strong>End:</strong> {new Date(result.to).toLocaleString()}</p>
                    <p><strong>Average clean energy share:</strong>
                        <span style={{ color: '#2E8B57', fontWeight: 'bold' }}> {result.ecoPercentage}%</span>
                    </p>
                </div>
            )}
        </div>
    );
}