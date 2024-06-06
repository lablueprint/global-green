import React, { useState, useEffect } from 'react';
import {
  PDFDocument, rgb, StandardFonts,
} from 'pdf-lib';
import styles from './page.module.css';

function PdfForm({
  templatePdf, userName, course, date, duration,
}) {
  const temp = new Date(date);
  const formattedDate = temp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedCourse = `${course} course`;

  const generatePdf = async () => {
    try {
      // Fetch the template PDF from the provided URL
      const response = await fetch(templatePdf);
      const templateBytes = await response.arrayBuffer();

      // Load the template PDF into a PDF document
      const pdfDoc = await PDFDocument.load(templateBytes);

      // set name of certificate
      pdfDoc.setTitle('Certificate.pdf');

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();

      // Modify the PDF document by replacing the placeholder text with the desired name
      const name = `${userName}`;
      const dateText = `${formattedDate}`;

      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // inserts name - adjustable name pos

      firstPage.drawText(name, {
        x: 35,
        y: height / 2 - 40,
        size: 44,
        font: helveticaFont,
        color: rgb(0.3176, 0.5843, 0.2745),
      });

      // inserts course - adjustable course name pos

      firstPage.drawText(formattedCourse, {
        x: 35,
        y: height / 2 - 105,
        size: 18,
        font: helveticaFont,
        color: rgb(0.3176, 0.5843, 0.2745),
      });

      // inserts date
      const dateWidth = helveticaFont.widthOfTextAtSize(dateText, 20);
      const dateX = (width - dateWidth) / 2 + 225;

      firstPage.drawText(dateText, {
        x: dateX,
        y: 450,
        size: 20,
        font: helveticaFont,
        color: rgb(0.3176, 0.5843, 0.2745),
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
      <div className={styles.certificateBox} onClick={generatePdf}>
        <div className={styles.certificateInfo}>{formattedDate}</div>
        <div className={styles.certificateHeader}>{userName}</div>
        <div className={styles.certificateName}>{formattedCourse}</div>
      </div>
    </div>
  );
}

export default PdfForm;
