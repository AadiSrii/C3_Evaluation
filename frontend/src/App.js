import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoverDesigner from './components/CoverDesigner';
import PageDesigner from './components/PageDesigner';
import PdfList from './components/PdfList';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoverDesigner />} />
        <Route path="/design-page" element={<PageDesigner />} />
        <Route path="/pdfs" element={<PdfList />} />
      </Routes>
    </Router>
  );
};

export default App;
