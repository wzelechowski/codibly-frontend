export interface GenerationMixResponse {
    date: string;
    dailyAverages: Record<string, number>;
    ecoPercentage: number;
}

export interface OptimalChargingWindowResponse {
    from: string;
    to: string;
    ecoPercentage: number;
}