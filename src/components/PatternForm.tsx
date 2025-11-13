'use client'; // <-- MUST be the very first line

import { useState } from "react";
import { RowStiches, Block } from "./Counter";
import Records from "./Records";

export default function PatternForm() {
  const stitchTypes = ['inc', 'sc', 'hdc', 'dc', 'tr'] as const;
  type StitchType = typeof stitchTypes[number];

  const stitchTitles: Record<StitchType, string> = {
    inc: 'Increase',
    sc: 'Single Crochet',
    hdc: 'Half Double Crochet',
    dc: 'Double Crochet',
    tr: 'Treble Crochet',
  };

  const [rowStiches, setRowStiches] = useState<RowStiches[]>([]);
  const [activeStitch, setActiveStitch] = useState<StitchType>('sc');
  const [repeat, setRepeat] = useState<number>(1);
  const [noteText, setNoteText] = useState<string>("");
  const [pattern, setPattern] = useState<Block[]>([]);
  const [patternRepeat, setPatternRepeat] = useState<number>(1);
  const [totalStitches, setTotalStitches] = useState<number>(0);

  
  const outputPerAction = (type: string) => {
    switch (type) {
      case "inc": return 2; // Increase = 2 stitches
      case "dec": return 1; // Decrease = 1 (you can modify if you want net loss)
      case "sc":
      case "hdc":
      case "dc":
      case "tr":
        return 1;
      default:
        return 1;
    }
  };

  // compute total stitches from current pattern and repeats
  const computeTotalFromPattern = (pattern: Block[], patternRepeat: number) => {
    const perBlock = pattern.reduce((sum, seg) => {
      const perAction = outputPerAction(seg.stitch) * (seg.count ?? 1);
      return sum + perAction;
    }, 0);
    return perBlock * Math.max(1, patternRepeat);
  };

  const getButtonClasses = (stitch: StitchType) => {
    const baseClasses = "px-4 py-2 text-sm font-medium border transition duration-150 ease-in-out";
    if (activeStitch === stitch) {
      return `${baseClasses} bg-blue-600 text-white border-blue-700 shadow-xl shadow-blue-500/50`;
    } else {
      return `${baseClasses} bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200`;
    }
  };

  const handleRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) setRepeat(value);
  };

  const handlePatternRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setPatternRepeat(value);
      setTotalStitches(computeTotalFromPattern(pattern, value)); // update live
    }
  };

  const AddSegment = () => {
    const newPattern = [...pattern, { stitch: activeStitch, count: repeat }];
    setPattern(newPattern);
    setRepeat(1);
    const total = computeTotalFromPattern(newPattern, patternRepeat);
    setTotalStitches(total);
  };

  const AddPattern = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pattern.length === 0) {
      alert("Please add at least one segment before submitting.");
      return;
    }

    const calculatedTotal = computeTotalFromPattern(pattern, patternRepeat);

    const newRow: RowStiches = {
      stitchCount: calculatedTotal,
      rowNumber: rowStiches.length + 1,
      notes: noteText,
      pattern: pattern,
      repeat: patternRepeat,
    };

    setRowStiches(prev => [...prev, newRow]);
    setPattern([]);
    setPatternRepeat(1);
    setTotalStitches(0);
    setNoteText("");
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-2xl font-bold">Pattern</h1>

      {/* Pattern Records Table */}
      <div className="w-full items-center max-w-2xl">
        <Records
          items={rowStiches}
          displayColumns={["rowNumber", "stitchCount", "pattern", "notes"]}
        />
      </div>

      <h1 className="text-2xl font-bold">Pattern Form</h1>
      <form className="mt-8 p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Select Your Stitch Type
        </h2>

        {/* Stitch type: Button Group */}
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {stitchTypes.map((stitch, index) => (
            <button
              key={stitch}
              type="button"
              onClick={() => setActiveStitch(stitch)}
              title={stitchTitles[stitch]}
              className={`
                ${getButtonClasses(stitch)}
                ${index === 0 ? 'rounded-l-lg' : ''}
                ${index === stitchTypes.length - 1 ? 'rounded-r-lg' : ''}
                ${index > 0 ? '-ml-px' : ''}
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
          <input
            type="number"
            id="stitch-repeat"
            value={repeat}
            onChange={handleRepeatChange}
            min="1"
            step="1"
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

        <div className="mb-6 mt-4">
          <label htmlFor="pattern-repeat" className="block text-sm font-medium text-gray-700 mb-2">
            Pattern Repeat: ({pattern.map(seg => `${seg.count} ${seg.stitch}`).join(', ')}) × {patternRepeat}
          </label>
          <input
            type="number"
            id="pattern-repeat"
            value={patternRepeat}
            onChange={handlePatternRepeatChange}
            min="1"
            step="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>

        <div className="mt-2 mb-4 text-gray-800 font-medium">
          Current total stitches: <span className="text-blue-600">{totalStitches}</span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Notes (optional)"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>

        <div className="mt-4 text-gray-700">
          Current note: <span className="italic">{noteText}</span>
        </div>

        <button
          type="submit"
          className="mt-6 btn-primary px-4 py-2 bg-blue-500 text-white rounded-md shadow-md active:bg-blue-400"
          onClick={AddPattern}
        >
          Submit Pattern
        </button>
      </form>
    </div>
  );
}
