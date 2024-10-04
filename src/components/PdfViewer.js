"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/browse/pdfjs-dist@4.6.82/build/pdf.worker.mjs"

const PdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    return (
        <div>
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className="w-[90%] max-w-[600px]">
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <div className="flex space-x-4">
                <button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(prev => prev - 1)}>
                    Previous
                </button>
                <button
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber(prev => prev + 1)}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default PdfViewer
