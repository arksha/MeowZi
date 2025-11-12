import React from 'react';
import { RowStiches } from './Counter';

type RowStitchesKey = keyof RowStiches;

const Records: React.FC<{ items: RowStiches[], displayColumns?: RowStitchesKey[] }> = ({ items, displayColumns = ["rowNumber", "stitchCount"] }) => {
    return (
        <div className="max-h-52 overflow-hidden overflow-y-scroll rounded-lg border border-gray-200">
            <div className="mt-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            {displayColumns.map(colName => (
                                <th key={colName as React.Key} className="text-center px-4 py-2 capitalize">
                                    {/* Format the column name for display (e.g., 'stitchCount' -> 'Stitch Count') */}
                                    {colName.replace(/([A-Z])/g, ' $1').trim()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {getReversedRows(items, displayColumns)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const getReversedRows = (items: RowStiches[], displayColumns: RowStitchesKey[]) => {
    const reversedItems = [...items].reverse();

    return reversedItems.map((item, index) => (
        <tr key={index} className="hover:bg-gray-50 transition-colors">
            {displayColumns.map(colName => {

                // We access the property using the validated colName
                const value = item[colName];

                let displayValue: React.ReactNode;

                if (Array.isArray(value)) {
                    if (colName === 'pattern') {
                        const patternString = value.map(block =>
                            `${block.stitch} (${block.count})`
                        ).join(', '); // Joins all formatted strings with a comma and space
                        displayValue = patternString
                        
                    } else {
                        displayValue = 'No pattern defined';
                    }

                } else if (value === undefined || value === null) {
                    displayValue = 'N/A';
                } else {
                    displayValue = value;
                }
                return (
                    <td key={colName as React.Key} className="text-center px-4 py-2">
                        {displayValue}
                    </td>
                );
            })}
        </tr>
    ));
};


export default Records;