function Sidebar({ handleFileChange, uploadedFileName }) {

  return (
      <div className="w-65 bg-[#071127] border-r border-[#1b2942] p-5 flex flex-col">
      <h2 className="text-gray-400 uppercase text-sm font-semibold mb-6">
        Library
      </h2>

      
      <label className="border-2 border-dashed border-[#334155] rounded-2xl min-h-35 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500 transition-all">
        <div className="text-5xl text-gray-500 mb-3">↑</div>
        <p className="text-gray-300 text-lg">Drop PDF or click</p>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

    
      <div className="mt-6 flex flex-col gap-2">
        {uploadedFileName ? (
          <div className="flex items-center gap-3 bg-[#0f1d37] border border-[#22314f] rounded-xl px-4 py-3">
            <span className="text-2xl">📄</span>
            <div className="flex flex-col overflow-hidden">
              <span className="text-white text-sm font-medium truncate">
                {uploadedFileName}
              </span>
              <span className="text-green-400 text-xs mt-0.5">Uploaded ✓</span>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center text-gray-500">No PDFs yet</div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
