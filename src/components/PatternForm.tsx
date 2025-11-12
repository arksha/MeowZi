'use client'; // <-- MUST be the very first line

import { useState } from "react";
import { RowStiches, Block, stichesIncrementMap } from "./Counter";
import Records from "./Records";


export default function PatternForm() {
    const stitchTypes = ['inc', 'dec', 'sc', 'hdc', 'dc', 'tr'] as const;
    const stitchTitles: Record<StitchType, string> = {
        inc: 'Increase',
        dec: 'Decrease',
        sc: 'Single Crochet',
        hdc: 'Half Double Crochet',
        dc: 'Double Crochet',
        tr: 'Treble Crochet',
    };

    type StitchType = typeof stitchTypes[number];

    const [rowStiches, setRowStiches] = useState<RowStiches[]>([]);

    const [activeStitch, setActiveStitch] = useState<StitchType>('sc'); // Default active is SC
    const [totalStitches, setTotalStitches] = useState<number>(0);
    const [repeat, setRepeat] = useState<number>(1);
    const [noteText, setNoteText] = useState<string>("");
    const [pattern, setPattern] = useState<Block[]>([]);
    const [patternRepeat, setPatternRepeat] = useState<number>(1);

    const getButtonClasses = (stitch: StitchType) => {
        const baseClasses = "px-4 py-2 text-sm font-medium border transition duration-150 ease-in-out";

        if (activeStitch === stitch) {
            // Active state: Blue background, white text, darker blue shadow
            return `${baseClasses} bg-blue-600 text-white border-blue-700 shadow-xl shadow-blue-500/50`;
        } else {
            // Inactive state: Light blue background, blue text, hover effects
            return `${baseClasses} bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200`;
        }
    };

    const handleRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);

        if (!isNaN(value) && value >= 1) {
            setRepeat(value);
        }
    };

    const handlePatternRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);

        if (!isNaN(value) && value >= 1) {
            setPatternRepeat(value);
        }
    }
    const AddSegment = () => {
        //compute and set total stitches based on activeStitch and other form inputs
        const stichTypeNum = stichesIncrementMap.get(activeStitch) || 1;
        console.log(`Adding segment: stitch type ${activeStitch} (${stichTypeNum}), repeat ${repeat}`);
        setTotalStitches(prev => prev + stichTypeNum * repeat); // Example increment
        setPattern(prevPattern => [
            ...prevPattern,
            {
                stitch: activeStitch,
                count: repeat
            }
        ]);
        setRepeat(1); // Reset repeat to 1 after adding segment
    }

    const AddPattern = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // calculate total stitches based on activeStitch and other form inputs
        setRowStiches(prevRowStiches => [
            ...prevRowStiches,
            {
                stitchCount: totalStitches,
                rowNumber: prevRowStiches.length + 1,
                notes: noteText,
                pattern: pattern,
                repeat: patternRepeat
            }
        ]);
        setPattern([]); // Reset pattern
        setPatternRepeat(1); // Reset pattern repeat
        setTotalStitches(0);
        setNoteText("");
        console.log(`Added pattern with stitch: ${activeStitch}`);
    }
    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="text-2xl font-bold">Pattern</h1>
            {/* Add your pattern form elements here */}
            <div className="w-full items-center max-w-2xl">
                <Records items={rowStiches} displayColumns={[
                    "rowNumber", "stitchCount", "pattern", "repeat", "notes"
                ]} />
            </div>
            <h1 className="text-2xl font-bold">Pattern Form</h1>
            <form className="mt-8 p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Your Stitch Type</h2>
                {/* Stich type: Button Group Container */}
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    {stitchTypes.map((stitch, index) => (
                        <button
                            key={stitch}
                            type="button" // Use type="button" to prevent form submission on click
                            onClick={() => setActiveStitch(stitch)}
                            // Apply specific rounding for first/last items in the group
                            title={stitchTitles[stitch]}
                            className={`
                                ${getButtonClasses(stitch)}
                                ${index === 0 ? 'rounded-l-lg' : ''}
                                ${index === stitchTypes.length - 1 ? 'rounded-r-lg' : ''}
                                ${index > 0 ? '-ml-px' : ''} /* Removes the double border between buttons */
                                `}
                        >
                            {stitch}
                        </button>
                    ))}
                </div>
                <div className="mb-6">
                    <label htmlFor="stitch-repeat" className="block text-sm font-medium text-gray-700 mb-2">
                        Repeat of Stitch: {activeStitch}
                    </label>
                    {/* The Number Scroll Input Field */}
                    <input
                        type="number"
                        id="stitch-repeat"
                        name="stitchRepeat"
                        value={repeat}
                        onChange={handleRepeatChange}
                        min="1"          // Optional: Set a minimum allowed value
                        step="1"         // Optional: Scroll increments by 1
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>

                <button
                    type="button"
                    className="btn-primary px-4 py-2 bg-blue-500 text-white rounded-md shadow-md active:bg-blue-400"
                    onClick={AddSegment}
                >
                    Add Segment
                </button>
                <div className="mb-6">
                    <label htmlFor="pattern-repeat" className="block text-sm font-medium text-gray-700 mb-2">
                        Repeat of Pattern: {pattern.map(seg => `${seg.count} ${seg.stitch}`).join(', ')}
                    </label>
                    {/* The Number Scroll Input Field */}
                    <input
                        type="number"
                        id="pattern-repeat"
                        name="patternRepeat"
                        value={patternRepeat}
                        onChange={handlePatternRepeatChange}
                        min="1"          // Optional: Set a minimum allowed value
                        step="1"         // Optional: Scroll increments by 1
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>current total stich: {totalStitches}</div>
                <div>
                    <input
                        type="text"
                        placeholder="Notes (optional)"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>Current note: {noteText}</div>
                <button
                    type="submit"
                    className="btn-primary px-4 py-2 bg-blue-500 text-white rounded-md shadow-md active:bg-blue-400"
                    onClick={AddPattern}
                >
                    Submit Form
                </button>
            </form>
        </div>
    )
}