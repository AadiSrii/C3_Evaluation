import React, { useEffect, useState } from 'react';
import { fetchPdfs, downloadPdf } from '../api';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const getPdfs = async () => {
      try {
        const { data } = await fetchPdfs();
        setPdfs(data);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    getPdfs();
  }, []);

  const handleDownload = async (id) => {
    try {
      const { data } = await downloadPdf(id);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      <h2>PDF List</h2>
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf._id}>
            {pdf.title} by {pdf.author}
            <button onClick={() => handleDownload(pdf._id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfList;
