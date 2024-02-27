import React, { useState } from 'react';
import {
  PDFDocument, rgb, degrees, StandardFonts,
} from 'pdf-lib';

function PdfForm({ templatePdfUrl, username }) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generatePdf = async () => {
    try {
      // Fetch the template PDF from the provided URL
      const templateBytes = await fetch(templatePdfUrl).then((response) => response.arrayBuffer());

      // Load the template PDF into a PDF document
      const pdfDoc = await PDFDocument.load(templateBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();

      // Modify the PDF document by replacing the placeholder text with the desired name
      const newText = `Name: ${username}`;

      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      firstPage.drawText(newText, {
        x: 55,
        y: height / 2 - 275,
        size: 20,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });

      // Generate the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();

      // Open a new window and display the modified PDF
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        const url = URL.createObjectURL(new Blob([modifiedPdfBytes], { type: 'application/pdf' }));
        newWindow.location.href = url;
      } else {
        console.error('Error opening new window.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
}

export default PdfForm;
