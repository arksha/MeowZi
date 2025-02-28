import React from 'react';
import { RowStiches } from './Counter';

const Records: React.FC<{items: RowStiches[]}> = ({items}) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Row Number</th>
                        <th>Total Count</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.rowNumber}</td>
                            <td>{item.totalCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Records;