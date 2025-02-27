"use client"; // Enables client-side state

import { useState } from "react";

type rowStiches = {
    stichesType: string;
    totalCount: number;
    rowNumber: number;
}
export default function Counter() {
    const [count, setCount] = useState<number>(0);
    // A multiply for the stitches
    const [stichesBatch, setStichesBatch] = useState<number>(0);
    const [rowStiches, setRowStiches] = useState<rowStiches[]>([]);

    const AddCount = () => {
        if (stichesBatch > 0) {
            setCount(prevCount => prevCount + stichesBatch);
        } else {
            setCount(prevCount => prevCount + 1);
        }
    };

    const MinusCount = () => {
        if (count <= 0 || count < stichesBatch) {
            return;
        }
        if (stichesBatch > 0) {
            setCount(prevCount => prevCount - stichesBatch);
        } else {
            setCount(prevCount => prevCount - 1);
        }
    };

    const CompleteRow = () => {
        setRowStiches(prevRowStiches => [
            ...prevRowStiches,
            {
                stichesType: "sc",
                totalCount: count,
                rowNumber: prevRowStiches.length + 1
            }
        ]);
        setCount(0);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <div>
                <p className="label-primary">Stiches Batch Number</p>
                <input type="text" className="input-primary"
                    value={stichesBatch}
                    onChange={(e) => setStichesBatch(Number(e.target.value))}
                    placeholder="Enter stiches batch" />
            </div>
            <h2 className="title">Count: {count} </h2>
            <div className="flex gap-4">
                <div className="flex-1 p-4 text-2xl">
                    <button className="btn-primary" 
                        onClick={AddCount}>Add</button>
                </div>
                <div className="flex-1 p-4 text-2xl">
                    <button className="btn-primary" 
                        onClick={MinusCount}>Minus</button>
                </div>
                <div className="flex-1 p-4 text-2xl">
                    <button className="btn-primary" 
                        onClick={CompleteRow}>Row Complete</button>
                </div>
            </div>
            <div>
                <button className="btn-secondary" 
                    onClick={() => setCount(0)}>Reset</button>
            </div>
            <div>
            <ul className="w-80 bg-white border border-gray-300 rounded-lg shadow-md p-4">
                {rowStiches.map((rowStich, index) => (
                    <li key={index}
                        className="p-3 border-b last:border-b-0 text-gray-800 hover:bg-gray-100 transition"
                        >RowNum: {rowStich.rowNumber} Total Count: {rowStich.totalCount} Type: {rowStich.stichesType}
                    </li>
                ))}
                </ul>
            </div>

        </div>
    );
}