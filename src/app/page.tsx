import Viewer from '@/components/Viewer';
import UIOverlay from '@/components/UIOverlay';

export default function Home() {
  return (
    <main className="flex w-full h-screen overflow-hidden bg-white">
      {/* Left Column: 3D Viewer (approx 65% width) */}
      <div className="relative w-[65%] h-full bg-[#fcfcfc]">
        {/* <div className="absolute top-6 left-6 z-10 flex items-center text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900">
          <span className="mr-2">‹</span> Back To Gallery
        </div> */}
        <Viewer />
      </div>

      {/* Right Column: Details & UI (approx 35% width) */}
      <div className="w-[35%] h-full overflow-y-auto border-l border-gray-200">
        <UIOverlay />
      </div>
    </main>
  );
}
