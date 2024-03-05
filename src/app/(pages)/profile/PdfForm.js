import React, { useState, useEffect } from 'react';
import {
  PDFDocument, rgb, StandardFonts,
} from 'pdf-lib';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from './page.module.css';

function PdfForm({
  templatePdf, firstName, lastName, course, date, duration,
}) {
  const generatePdf = async () => {
    try {
      // Fetch the template PDF from the provided URL
      const response = await fetch(templatePdf);
      const templateBytes = await response.arrayBuffer();

      // Load the template PDF into a PDF document
      const pdfDoc = await PDFDocument.load(templateBytes);

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();

      // Modify the PDF document by replacing the placeholder text with the desired name
      const name = `${firstName} ${lastName}`;
      const dateText = `Completed on: ${date}`;

      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // inserts name - adjustable name pos

      const nameWidth = helveticaFont.widthOfTextAtSize(name, 50);
      const nameX = (width - nameWidth) / 2;

      firstPage.drawText(name, {
        x: nameX,
        y: height / 2 + 20,
        size: 50,
        font: helveticaFont,
        color: rgb(0, 0.1, 0),
      });

      // inserts course - adjustable course name pos
      const courseWidth = helveticaFont.widthOfTextAtSize(course, 30);
      const courseX = (width - courseWidth) / 2;

      firstPage.drawText(course, {
        x: courseX,
        y: height / 2 - 110,
        size: 30,
        font: helveticaFont,
        color: rgb(0, 0.1, 0),
      });

      // inserts date
      const dateWidth = helveticaFont.widthOfTextAtSize(dateText, 20);
      const dateX = (width - dateWidth) / 2;

      firstPage.drawText(dateText, {
        x: dateX,
        y: height / 2 - 290,
        size: 20,
        font: helveticaFont,
        color: rgb(0, 0.1, 0),
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
