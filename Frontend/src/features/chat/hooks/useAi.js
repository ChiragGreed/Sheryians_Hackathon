import { useState } from 'react';
import { aiRespond } from '../services/ai.api';

export const useAi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getAiResponse = async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await aiRespond(payload);
            setData(response.data);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to get AI response';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        getAiResponse,
        loading,
        error,
        data,
    };
};
