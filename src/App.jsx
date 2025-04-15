import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DownloadsPage from './components/DownloadPage';
import UploadPage from './components/UploadPage';
import AutoDownloadPage from './components/AutoDownload';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/Print-Online/auto-download" element={<AutoDownloadPage/>}/>
        <Route path="/Print-Online/" element={<UploadPage />} />
        <Route path="/Print-Online/downloads" element={<DownloadsPage />} />
      </Routes>
    </Router>
  );
}

export default App;