// components/TopBanner.tsx
import Link from 'next/link';

const TopBanner = () => {
  return (
    <div className="relative z-50">
      <Link 
        href="stake.com/?c=DwfSNO7Z" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block bg-yellow-400 text-black py-2 text-center font-bold hover:bg-yellow-300 transition-colors duration-300"
      >
        <div className="flex items-center justify-center">
          <span>Play game and earn money </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default TopBanner;