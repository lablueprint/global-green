import React, { useState, useEffect } from 'react';
import {
  PDFDocument, rgb, StandardFonts,
} from 'pdf-lib';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from './page.module.css';

function PdfForm({
  templatePdfUrl, firstName, lastName, course, date, duration,
}) {
  const generatePdf = async () => {
    try {
      // Fetch the template PDF from the provided URL
      const templateBytes = await fetch(templatePdfUrl).then((response) => response.arrayBuffer());

      // Load the template PDF into a PDF document
      const pdfDoc = await PDFDocument.load(templateBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();

      // Modify the PDF document by replacing the placeholder text with the desired name
      const newText = `Name: ${firstName} ${lastName}`;

      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const textWidth = helveticaFont.widthOfTextAtSize(newText, 30);
      const textX = (width - textWidth) / 2;

      firstPage.drawText(newText, {
        x: textX,
        y: height / 2,
        size: 30,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(course, {
        x: textX,
        y: height / 2 + 10,
        size: 30,
        font: helveticaFont,
        color: rgb(0, 0, 0),
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

  useEffect(() => {
    generatePdf();
  }, []);

  return (
    <div className={styles.certificateBox} onClick={generatePdf}>
      <div className={styles.certificateHeader}> Certificate </div>
      <div className={styles.certificateName}>{course}</div>
      <div className={styles.certificateInfo}>
        <AiOutlineInfoCircle className={styles.infoCircle} />
        <div> Date: </div>
        <div>{date}</div>
      </div>
      <div className={styles.certificateInfo}>
        <AiOutlineInfoCircle className={styles.infoCircle} />
        <div> Duration: </div>
        <div>{duration}</div>
      </div>
    </div>
  );
}

export default PdfForm;
