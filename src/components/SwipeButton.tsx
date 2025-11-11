"use client"; // Enables client-side state

import { motion, PanInfo } from "framer-motion";
import { useEffect, useState } from "react";

type SwipeButtonProps = {
    setDragDirection: React.Dispatch<React.SetStateAction<number>>;
};

const SwipeButton: React.FC<SwipeButtonProps> = ({ setDragDirection }) => {
    const [dragConstraints, setDragConstraints] = useState({ left: -100, right: 100 });

    useEffect(() => {
        const updateConstraints = () => {
            const screenWidth = window.innerWidth;
            const constraint = Math.min(screenWidth / 4, 150); // Limit to 1/4th of screen width or max 150px
            setDragConstraints({ left: -constraint, right: constraint });
        };

        updateConstraints(); // Set initial constraints
        window.addEventListener("resize", updateConstraints); // Update on screen resize

        return () => {
            window.removeEventListener("resize", updateConstraints); // Cleanup listener
        };
    }, []);

    const handleOnDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 0) {
            setDragDirection(-1); // drag to right
        } else {
            setDragDirection(1); // drag to left
        }
    };

    const handleDragEnd = () => {
        setDragDirection(0);
    };

    return (
        <div className="relative w-full flex items-center justify-center">
            {/* Left Label */}
            <div className="absolute left-0 flex items-center gap-2">
                <span className="text-blue-500 font-bold">⬅ Add</span>
            </div>

            {/* Right Label */}
            <div className="absolute right-0 flex items-center gap-2">
                <span className="text-blue-500 font-bold">Minus ➡</span>
            </div>

            <motion.div
                dragSnapToOrigin
                drag="x" // Allow horizontal dragging
                dragConstraints={dragConstraints} // Dynamically calculated constraints
                dragElastic={0.2} // Adds resistance
                animate={{ x: 0 }} // Always return to center
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onDragEnd={handleDragEnd}
                onDrag={handleOnDrag}
                className="w-auto px-4 h-16 bg-blue-600 bg-opacity-50 text-white flex items-center justify-center rounded-lg shadow-lg"
            >
                <p className="text-lg font-semibold tracking-wide">Swipe</p>
            </motion.div>
        </div>
    );
};

export default SwipeButton;