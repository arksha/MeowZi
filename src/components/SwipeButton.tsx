"use client"; // Enables client-side state

import { motion, PanInfo } from "framer-motion";

type SwipeButtonProps = {
    setDragDirection: React.Dispatch<React.SetStateAction<number>>;
};

const SwipeButton: React.FC<SwipeButtonProps> = ({
    setDragDirection,
}) => {
    
    const handleOnDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>{
        if (info.offset.x > 0) {
            setDragDirection(-1); // drag to right 
        } else {
            setDragDirection(1); // drag to left
        }
    }
    const handleDragEnd = () => {
        setDragDirection(0);
    };
    return (
        <div>
            <motion.div 
                dragSnapToOrigin
                drag="x" // Allow horizontal dragging
                dragConstraints={{ left: -250, right: 250 }} // Limit drag area
                dragElastic={0.2} // Adds resistance
                animate={{ x: 0 }} // Always return to center
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onDragEnd={handleDragEnd}
                onDrag={handleOnDrag}
                className="h-16 bg-blue-500 text-white flex items-center justify-center rounded-lg shadow-lg"
                >
                <p>{"<"}= Add | Minus ={">"}</p>
            </motion.div>
        </div>
    )
}

export default SwipeButton;