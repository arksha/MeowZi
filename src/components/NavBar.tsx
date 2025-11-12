'use client'; // <-- MUST be the very first line

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the hook


export default function Navbar() {
    const currentPath = usePathname(); // Get the current path

    // Function to determine link classes dynamically
    const getLinkClasses = (path: string) => {

        const baseClasses = "transition duration-200 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white";
        
        // Check if the current path matches the link's path
        if (currentPath === path) {
          // Active state classes: e.g., bright text with a glow/shadow effect
          // drop-shadow-md applies a filter-based shadow directly to the text shape
          return `${baseClasses} text-white filter drop-shadow-md font-bold`; 
        } else {
          // Inactive state classes
          return `${baseClasses}`;
        }
      };

    return (
        <nav className="bg-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/Brand link */}
                <Link href="/" className="text-white text-2xl font-bold">
                    Meow-zi
                </Link>

                <div className="flex space-x-4">
                    {/* Apply the dynamic classes */}
                    <Link href="/" className={getLinkClasses('/')}>
                        Count
                    </Link>
                    <Link href="/pattern" className={getLinkClasses('/pattern')}>
                        Pattern
                    </Link>
                </div>
            </div>
        </nav>
    );
}
