import { useState, useEffect } from 'react'
import { fetchData, fetchPrice } from '../utils/api'
import { ApiResponse, CoinPrice } from '../types/api'

export function useData() {
    const [data, setData] = useState<ApiResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchData<ApiResponse>('/list')
            .then((result) => {
                setData(result)
            })
            .catch((e) => {
                setError(e.message)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    return { data, loading, error }
}

export function usePrice(code: string) {
    const [coinsData, setData] = useState<CoinPrice[] | null>(null)
    const [coinLoading, setLoading] = useState<boolean>(true)
    const [coinError, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true);
        const closeSSE = fetchPrice<CoinPrice[]>(
            '/price/',
            code,
            (data) => {
                setData(data);
                setLoading(false);
            },
            (e) => {
                setError(e.message)
                setLoading(false);
            }
        );

        return () => {
            closeSSE();
        };
    }, [code]);

    return { coinsData, coinLoading, coinError }
}