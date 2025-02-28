"use client"; // Enables client-side state

import { useCallback, useEffect, useState } from "react";
import Records from "./Records";
import SwipeButton from "./SwipeButton";

export type RowStiches = {
    totalCount: number;
    rowNumber: number;
}

export const stichesHeightMap = new Map<string, number>([
    ["sc", 1],
    ["hdc", 2],
    ["dc", 3],
    ["tr", 4],
    ["dtr", 5],
    ["trtr", 6],
    ["qtr", 7],
]);

export default function Counter() {
    const [count, setCount] = useState<number>(0);
    // A multiply for the stitches
    const [stichesBatch, setStichesBatch] = useState<number>(1);
    const [rowStiches, setRowStiches] = useState<RowStiches[]>([]);
    const [direction, setDirection] = useState<number>(0); // drag direction, start from 0, left 1, right -1

    const AddCount = useCallback(() => {
        if (stichesBatch > 1) {
            setCount(prevCount => prevCount + stichesBatch);
        } else {
            setCount(prevCount => prevCount + 1);
        }
    }, [stichesBatch]);

    const MinusCount = useCallback(() => {
        setCount(prevCount => {
            if (prevCount <= 0 || prevCount < stichesBatch) {
                return prevCount;
            }
            return prevCount - stichesBatch;
        });
    }, [stichesBatch]);

    const CompleteRow = () => {
        setRowStiches(prevRowStiches => [
            ...prevRowStiches,
            {
                totalCount: count,
                rowNumber: prevRowStiches.length + 1
            }
        ]);
        setCount(0);
    };

    useEffect(() => {
        if (direction === 1) {
            AddCount();
        } else if (direction === -1) {
            MinusCount();
        }
        setDirection(0);
    }, [direction, AddCount, MinusCount]);

    return (
        <div >
            <div className="grid grid-cols-2 items-center gap-4 p-6">
                <div>
                    <Records items={rowStiches} />
                </div>
                <div>
                    <div>
                        <p className="label-primary">Stiches Batch Number</p>
                        
                        <input type="text" className="input-primary"
                            value={stichesBatch}
                            onChange={(e) => setStichesBatch(Number(e.target.value))}
                            placeholder="Enter stiches batch" />
                    </div>
                    <h2 className="title">Count: {count} </h2>
                    <div>
                        <div className="flex-1 p-4">
                            <SwipeButton 
                                setDragDirection={setDirection}
                            /> 
                        </div>
                    </div>
                    <div>
                        <div className="flex-1 p-4">
                            <button className="btn-primary" 
                                onClick={CompleteRow}>Row Complete</button>
                        </div>
                        <div className="flex-1 p-4">
                            <button className="btn-secondary" 
                                onClick={() => setCount(0)}>Reset Row</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}