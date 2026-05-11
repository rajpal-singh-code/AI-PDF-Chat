import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PdfPreview({ pdfFile }) {

  return (

    <div className="flex justify-center items-start w-full h-full overflow-auto">

      {

        pdfFile ? (

          <div className="bg-white rounded-md overflow-hidden shadow-2xl max-w-full">

            <Document file={pdfFile}>

              <Page
                pageNumber={1}
                width={
                  window.innerWidth < 640
                    ? 280
                    : window.innerWidth < 768
                    ? 400
                    : window.innerWidth < 1024
                    ? 500
                    : 700
                }
              />

            </Document>

          </div>

        ) : (

          <div className="h-full flex flex-col items-center justify-center text-center px-4">

            <div className="text-5xl md:text-7xl mb-4">
              📖
            </div>

            <h2 className="text-xl md:text-2xl text-gray-300 mb-2">
              Select or upload a PDF
            </h2>

            <p className="text-gray-500 text-sm md:text-base">
              Upload PDF from sidebar
            </p>

          </div>

        )
      }

    </div>
  );
}

export default PdfPreview;