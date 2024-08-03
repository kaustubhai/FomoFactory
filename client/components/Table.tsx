import { CoinPrice } from '@/types/api';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface Column<T> {
    header: string;
    accessor: keyof CoinPrice;
    width?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: CoinPrice[] | null;
    className?: string;
}
export function Table<T>({ columns, data, className }: TableProps<T>) {
    // Ping effect
    const [ping, setPing] = useState<boolean>(false);
    useEffect(() => {
        setPing(true);
        setTimeout(() => {
            setPing(false);
        }, 1200);
    }, [data]);

    // Table sorting
    if (data) {
        data.sort((a, b) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
    }

    return (
        <div className={`w-full overflow-x-auto shadow-md sm:rounded-lg ${className}`}>
            <table className="w-full text-sm text-left text-gray-500">
                {/* Table header */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.accessor as string}
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                                style={{ width: column.width }}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {data && data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`${rowIndex === 0 && ping && "bg-green-100"} transition-all ease-out duration-700 border-b hover:bg-gray-50`}>
                            {columns.map((column) => (
                                <td
                                    key={column.accessor as string}
                                    className="px-6 py-4 whitespace-nowrap"
                                >
                                    {
                                        column.accessor === 'updatedAt' ? dayjs(row[column.accessor]).format('MMMM DD YYYY, h:mm:ss A') :
                                            row[column.accessor]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}