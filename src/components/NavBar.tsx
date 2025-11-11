import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand link */}
        <Link href="/" className="text-white text-2xl font-bold">
          Meow-zi
        </Link>
        
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-200 hover:text-white transition duration-200">
            Counter
          </Link>
          <Link href="/pattern" className="text-gray-200 hover:text-white transition duration-200">
            Pattern
          </Link>
        </div>
      </div>
    </nav>
  );
}
