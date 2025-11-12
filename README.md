# MeowZi App

## Description
MeowZi is a React-based application that provides an interactive counter with swipe functionality and a records table. It is styled using **Tailwind CSS** and leverages **Framer Motion** for animations.

---

## Project Structure
```markdown
/src
├── components
│   ├── Counter.tsx       # Main counter component with controls and swipe functionality
│   ├── Records.tsx       # Displays a table of recorded rows
│   ├── SwipeButton.tsx   # Swipeable button for incrementing/decrementing the counter
├── styles
│   ├── globals.css       # Global Tailwind CSS styles
```

---

## Features
- **Counter**: 
  - Increment or decrement the count using a swipe button.
  - Select batch sizes for stitches from a dropdown.
  - Record completed rows in a table.
- **Records Table**:
  - Displays recorded rows with row numbers and total counts.
  - Rows are dynamically updated and displayed in reverse order.
- **Swipe Button**:
  - Swipe left to add and swipe right to subtract.
  - Responsive swipe constraints based on screen width.

---

## Tools and Libraries
- **React**: Component-based UI library.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Animation library for React.
- **TypeScript**: Static typing for better code quality.

---

## Getting Started

### Install Dependencies
```bash
npm install

### Start dev app
```
npm run dev