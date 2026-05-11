
function Sidebar({ handleFileChange, uploadedFileName }) {

  return (

    <div className="w-full md:w-65 bg-[#071127] border-r border-[#1b2942] p-5 flex flex-col">

      <h2 className="text-gray-400 uppercase text-sm font-semibold mb-5">
        Library
      </h2>

      <label className="border-2 border-dashed border-[#334155] rounded-2xl h-32 md:h-40 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500 transition-all">

        <div className="text-4xl text-gray-500 mb-2">
          ↑
        </div>

        <p className="text-gray-300 text-sm md:text-lg text-center px-2">
          Drop PDF or click
        </p>

        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

      </label>


      <div className="mt-5">

        {uploadedFileName ? (

          <div className="flex items-center gap-3 bg-[#0f1d37] border border-[#22314f] rounded-xl px-3 py-3 overflow-hidden">

            <span className="text-2xl shrink-0">
              📄
            </span>

            <div className="overflow-hidden">

              <p className="text-white text-sm font-medium truncate">
                {uploadedFileName}
              </p>

              <p className="text-green-400 text-xs">
                Uploaded ✓
              </p>

            </div>

          </div>

        ) : (

          <div className="text-gray-500 text-center mt-5 text-sm">
            No PDFs yet
          </div>

        )}

      </div>

    </div>
  );
}

export default Sidebar;