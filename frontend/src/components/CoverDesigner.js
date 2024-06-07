import React, { useState } from 'react';
import { createPdf } from '../api';

const CoverDesigner = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [frontCover, setFrontCover] = useState(null);
  const [backCover, setBackCover] = useState(null);

  const handleFileChange = (e, setCover) => {
    const file = e.target.files[0];
    setCover(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('frontCover', frontCover);
    formData.append('backCover', backCover);

    try {
      await createPdf(formData);
      alert('PDF created successfully');
    } catch (error) {
      console.error('Error creating PDF:', error);
      alert('Failed to create PDF');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Design Cover</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <label>Front Cover:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setFrontCover)} required />
      </div>
      <div>
        <label>Back Cover:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setBackCover)} required />
      </div>
      <button type="submit">Create PDF</button>
    </form>
  );
};

export default CoverDesigner;
