"use client"; // Enables client-side state

import { useCallback, useEffect, useState } from "react";
import Records from "./Records";
import SwipeButton from "./SwipeButton";

export interface Block {
    stitch: string;
    count: number;
}
export interface RowStiches {
    stitchCount: number;
    rowNumber: number;
    pattern?: Block[];
    repeat?: number;
    notes?: string;
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

export const stichesIncrementMap = new Map<string, number>([
    ["inc", 2],
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
                stitchCount: count,
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
        <div className="flex flex-col items-center gap-8 p-8">
            {/* Records Section */}
            <div className="w-full max-w-2xl">
                <Records items={rowStiches} />
            </div>

            {/* Controls Section */}
            <div className="w-full max-w-md flex flex-col gap-6">
                {/* Stitches Batch Selector */}
                <div className="flex flex-col items-center gap-2">
                    <p className="label-primary text-lg font-semibold">Stitches Batch Number</p>
                    <select
                        className="appearance-none input-primary w-full max-w-xs p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        value={stichesBatch}
                        onChange={(e) => setStichesBatch(Number(e.target.value))}
                    >
                        <option className="bg-blue-100 text-blue-800 font-medium text-base" value={1}>
                            1 Stitch
                        </option>
                        <option className="bg-blue-200 text-blue-800 font-medium text-base" value={5}>
                            5 Stitches
                        </option>
                        <option className="bg-blue-300 text-blue-800 font-medium text-base" value={10}>
                            10 Stitches
                        </option>
                        <option className="bg-blue-400 text-blue-800 font-medium text-base" value={15}>
                            15 Stitches
                        </option>
                        <option className="bg-blue-500 text-white font-medium text-base" value={20}>
                            20 Stitches
                        </option>
                    </select>
                </div>

                {/* Count Display */}
                <div className="text-center">
                    <h2 className="title text-2xl font-bold">Count: {count}</h2>
                </div>

                {/* Swipe Button */}
                <div className="flex justify-center">
                    <SwipeButton setDragDirection={setDirection} />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        className="btn-primary px-4 py-2 bg-blue-500 text-white rounded-md shadow-md active:bg-blue-400"
                        onClick={CompleteRow}
                    >
                        Row Complete
                    </button>
                    <button
                        className="btn-secondary px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md active:bg-gray-200"
                        onClick={() => setCount(0)}
                    >
                        Reset Row
                    </button>
                </div>
            </div>
        </div>
    );
}