import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DownloadsPage from './components/DownloadPage';
import UploadPage from './components/UploadPage';
import AutoDownloadPage from './components/AutoDownload';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/auto-download" element={<AutoDownloadPage/>}/>
        <Route path="/" element={<UploadPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
      </Routes>
    </Router>
  );
}

export default App;