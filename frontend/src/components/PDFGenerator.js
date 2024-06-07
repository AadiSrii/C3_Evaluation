import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust the import path as needed

const PDFGenerator = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState(['', '', '', '', '']);
  const [frontCover, setFrontCover] = useState(null);
  const [backCover, setBackCover] = useState(null);
  const [internalPages, setInternalPages] = useState([null, null, null, null, null]);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleInternalPageChange = (e, index) => {
    const newInternalPages = [...internalPages];
    newInternalPages[index] = e.target.files[0];
    setInternalPages(newInternalPages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    frontCover && formData.append('frontCover', frontCover);
    backCover && formData.append('backCover', backCover);
    internalPages.forEach((page, index) => {
      page && formData.append('internalPages', page);
    });

    try {
      const response = await axiosInstance.post('/pdf/generate', formData, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <label>Front Cover</label>
        <input type="file" onChange={(e) => handleFileChange(e, setFrontCover)} />
      </div>
      <div>
        <label>Back Cover</label>
        <input type="file" onChange={(e) => handleFileChange(e, setBackCover)} />
      </div>
      {content.map((text, index) => (
        <div key={index}>
          <label>Content Page {index + 1}</label>
          <textarea value={text} onChange={(e) => {
            const newContent = [...content];
            newContent[index] = e.target.value;
            setContent(newContent);
          }} />
          <input type="file" onChange={(e) => handleInternalPageChange(e, index)} />
        </div>
      ))}
      <button type="submit">Generate PDF</button>
    </form>
  );
};

export default PDFGenerator;
