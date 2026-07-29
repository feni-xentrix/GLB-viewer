'use client';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';

export default function UIOverlay() {
  const { selectedShape, setSelectedShape, ringType, setRingType } = useConfiguratorStore();

  // Keeping only the shapes we currently have mapped
  const shapes = ['ThinRing', 'ThinRing1', 'ThinRing2', 'ThinRing3'];
  const shapeNames: Record<string, string> = {
    ThinRing: 'Round',
    ThinRing1: 'Princess',
    ThinRing2: 'Oval',
    ThinRing3: 'Heart'
  };

  return (
    <div className="flex flex-col p-8 lg:p-12 w-full min-h-full text-gray-900 bg-white">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-serif text-[#1b253b] leading-tight">Knife Edge Solitaire Engagement Ring <br /> <span className="text-gray-500 text-2xl">Diamond Tulip Head</span></h1>
      </div>

      <div className="mb-8">
        <div className="text-2xl font-medium mb-1">$1,900 <span className="text-sm font-normal text-gray-500">(Setting Price)</span></div>
        <p className="text-xs text-gray-500">Starting at 6 payments 0% APR of <b>$316.67</b>/mo ⓘ</p>
      </div>

      <div className="mb-4 border-b border-gray-100 pb-2">
        <h3 className="font-semibold text-[17px] text-[#1b253b]">Select Ring Design</h3>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-3">
        {[
          { id: 'original', label: 'Customizer' },
          { id: 'white', label: 'White Diamond' },
          { id: 'yellow', label: 'Yellow Diamond' }
        ].map((type) => {
          const isActive = ringType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setRingType(type.id)}
              className={`py-3 text-xs font-medium border rounded-sm transition-all ${isActive ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      {ringType === 'original' && (
        <>
          <div className="mb-6 border-b border-gray-100 pb-3">
            <h3 className="font-semibold text-[17px] text-[#1b253b]">Diamond Preview ⓘ</h3>
          </div>

          <div className="mb-10">
            <div className="text-sm mb-3">Preview Shape: <span className="font-semibold text-[#1b253b]">{shapeNames[selectedShape] || 'Round'}</span></div>
            <div className="grid grid-cols-4 gap-3">
              {shapes.map((shape) => {
                const isActive = selectedShape === shape;
                return (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(shape)}
                    className={`flex flex-col items-center justify-center py-4 border rounded-sm transition-all ${isActive ? 'border-gray-900 border-[1.5px] shadow-[0_2px_10px_rgb(0,0,0,0.05)]' : 'border-gray-200 hover:border-gray-400'
                      }`}
                  >
                    <div className={`w-8 h-8 mb-2 rounded-full border ${isActive ? 'border-gray-900' : 'border-gray-300'}`}></div>
                    <span className={`text-[11px] ${isActive ? 'font-medium text-gray-900' : 'text-gray-500'}`}>{shapeNames[shape]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* <div className="mb-8">
        <div className="text-sm mb-3">Preview Size: <span className="font-semibold text-[#1b253b]">1 ct. tw.</span></div>
        <div className="flex gap-3">
          {['1', '1.5', '2', '2.5'].map((size, idx) => (
            <button key={idx} className={`w-14 h-10 border rounded-sm text-sm flex items-center justify-center ${idx === 0 ? 'border-gray-900 font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
              {size}
            </button>
          ))}
        </div>
      </div> */}
        </>
      )}

      {/* <div className="mt-8 pt-8">
        <button className="w-full bg-[#1b253b] text-white py-4 rounded-sm font-medium text-lg hover:bg-[#2c3a59] transition-colors shadow-lg">
          Add To Cart
        </button>
      </div> */}
    </div>
  );
}
