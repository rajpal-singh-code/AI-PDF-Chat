import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PdfPreview({ pdfFile }) {

  return (

    <div className="flex justify-center w-full">

      {

        pdfFile ? (

          <div className="bg-white shadow-2xl rounded-md overflow-hidden">

            <Document file={pdfFile}>

              <Page
                pageNumber={1}
                width={700}
              />

            </Document>

          </div>

        ) : (

          <div className="h-full flex flex-col items-center justify-center text-center">

            <div className="text-7xl mb-5">
              📖
            </div>

            <h2 className="text-2xl text-gray-300 mb-3">
              Select or upload a PDF
            </h2>

            <p className="text-gray-500">
              Upload PDF from sidebar
            </p>

          </div>
        )
      }

    </div>
  );
}

export default PdfPreview;