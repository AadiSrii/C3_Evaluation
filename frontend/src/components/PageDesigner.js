import React, { useState } from 'react';

const PageDesigner = () => {
  const [pages, setPages] = useState([{ content: '', alignment: 'left' }]);

  const addPage = () => {
    setPages([...pages, { content: '', alignment: 'left' }]);
  };

  const handlePageChange = (index, field, value) => {
    const newPages = pages.map((page, i) => (i === index ? { ...page, [field]: value } : page));
    setPages(newPages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pages:', pages);
  };

  return (
    <form onSubmit={handleSubmit}>
      {pages.map((page, index) => (
        <div key={index}>
          <textarea
            value={page.content}
            onChange={(e) => handlePageChange(index, 'content', e.target.value)}
            placeholder="Page content"
            required
          />
          <select
            value={page.alignment}
            onChange={(e) => handlePageChange(index, 'alignment', e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={addPage}>
        Add Page
      </button>
      <button type="submit">Save Pages</button>
    </form>
  );
};

export default PageDesigner;
