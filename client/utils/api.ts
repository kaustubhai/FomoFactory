import { EventSourcePolyfill } from 'event-source-polyfill';

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/crypto";
export async function fetchData<T>(url: string): Promise<T> {
    const fullURL = `${baseURL}${url}`;
    const response = await fetch(fullURL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export function fetchPrice<T>(url: string, code: string, onMessage: (data: T) => void, onError?: (error: any) => void): () => void {
    const fullURL = `${baseURL}${url}${code}`;

    const eventSource = new EventSourcePolyfill(fullURL, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    eventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data) as T;
            onMessage(data);
        } catch (error) {
            console.error('Error parsing SSE data:', error);
            if (onError) onError(error);
        }
    };

    eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        if (onError) onError(error);
        eventSource.close();
    };

    return () => {
        eventSource.close();
    };
}