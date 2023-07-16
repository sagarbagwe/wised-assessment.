import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const logoUrl = 'https://images.vexels.com/content/216749/preview/online-study-logo-design-2cf5cf.png';

import Home from './pages/Home';
import StudyUpload from './pages/StudyUpload';
import StudySearch from './pages/StudySearch';

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="/" className="hover:underline">study repo</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">About -sagar bagwe</a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">wised</a>
          </li>
          <li>
            <a href="mailto:sagarbagwe2506@gmail.com" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-gray-300 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logoUrl} alt="logo" className="w-28 object-contain" />
      </Link>

      <div className="flex">
        <Link to="/" className="font-inter font-medium bg-green-500 text-white px-4 py-2 rounded-md mr-4">Home</Link>
        <Link to="/study-upload" className="font-inter font-medium bg-green-500 text-white px-4 py-2 rounded-md mr-4">Study Upload</Link>
        <Link to="/study-search" className="font-inter font-medium bg-green-500 text-white px-4 py-2 rounded-md">Study Search</Link>
      </div>
    </header>
  );
};

const App = () => (
  <BrowserRouter>
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/study-upload" element={<StudyUpload />} />
      <Route path="/study-search" element={<StudySearch />} />
    </Routes>

    <Footer />
  </BrowserRouter>
);

export default App;
