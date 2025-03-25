import React from 'react';
import { RowStiches } from './Counter';

const Records: React.FC<{items: RowStiches[]}> = ({items}) => {
    return (
        <div className="max-h-52 overflow-hidden overflow-y-scroll rounded-lg border border-gray-200">
            <div className="mt-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Row Number</th>
                            <th>Total Count</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {getReversedRows(items)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const getReversedRows = (items: RowStiches[]) => {
    const rows = [];
    for (let i = items.length - 1; i >= 0; i--) {
        rows.push(
            <tr key={i}>
                <td>{items[i].rowNumber}</td>
                <td>{items[i].totalCount}</td>
            </tr>
        );
    }
    return rows;
}

export default Records;