"use client"; // Enables client-side state

import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState<number>(0);

    const AddCount = () => setCount(count + 1);
    const MinusCount = () => {
        if (count <= 0) {
            return;
        }
        setCount(count - 1);
    };

    return (
        <div>
            <h2>Count: {count} </h2>
            <div>
                <button onClick={AddCount}>Add</button>
            </div>
            <div>
                <button onClick={MinusCount}>Minus</button>
            </div>
            <div>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    );
}