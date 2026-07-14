import type {GenerationMixResponse, OptimalChargingWindowResponse} from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchGenerationMix = async (): Promise<GenerationMixResponse[]> => {
    const response = await fetch(`${API_URL}/api/v1/generation`);
    if (!response.ok) throw new Error('Error during fetching generation mix data');
    return response.json();
};

export const fetchOptimalWindow = async (hours: number): Promise<OptimalChargingWindowResponse> => {
    if (hours < 1 || hours > 6) throw new Error("Count of hours cannot be less than 1 and greater than 6")
    const response = await fetch(`${API_URL}/api/v1/generation/window?hours=${hours}`);
    if (!response.ok) throw new Error('Error during searching optimal charge window');
    return response.json();
};