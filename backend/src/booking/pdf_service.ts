/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');
import { Response } from 'express';

export function generateBookingPDF(
  data: {
    fanName: string;
    celebrityName: string;
    bookingDate: string;
    fee: string;
    note?: string;
  },
  res: Response,
) {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=booking-summary.pdf',
  );

  doc.pipe(res);

  doc.fontSize(20).text('🎉 Booking Summary', { underline: true });
  doc.moveDown();

  doc.fontSize(14).text(`📅 Date: ${data.bookingDate}`);
  doc.text(`🧑 Fan: ${data.fanName}`);
  doc.text(`🌟 Celebrity: ${data.celebrityName}`);
  doc.text(`💸 Fee: ₹${data.fee}`);
  if (data.note) doc.text(`📝 Note: ${data.note}`);

  doc.end();
}
