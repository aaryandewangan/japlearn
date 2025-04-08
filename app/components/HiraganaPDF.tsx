'use client'
import { FiDownload } from 'react-icons/fi';
import { jsPDF } from 'jspdf';

export default function HiraganaPDF() {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set font for Japanese characters
    doc.addFileToVFS('NotoSansJP-Regular.ttf', notoSansJPBase64); // You'll need the font file
    doc.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal');
    doc.setFont('NotoSansJP');

    // Title
    doc.setFontSize(20);
    doc.text('Complete Hiragana Chart', 105, 15, { align: 'center' });
    
    // Gojūon Table
    doc.setFontSize(16);
    doc.text('1. Gojūon (五十音)', 20, 30);
    
    // Add table headers and content for Gojūon
    // ... table content

    // Dakuon Table
    doc.text('2. Dakuon (濁音)', 20, 120);
    // ... table content

    // Handakuon Table
    doc.text('3. Handakuon (半濁音)', 20, 180);
    // ... table content

    // Save PDF
    doc.save('hiragana-chart.pdf');
  };

  return (
    <button
      onClick={generatePDF}
      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 
        text-white rounded-lg transition-all"
    >
      <FiDownload />
      Download Hiragana Chart
    </button>
  );
} 