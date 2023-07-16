import React, { useState } from 'react';
import axios from 'axios';

const StudyUpload = () => {
  const [name, setName] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [category, setCategory] = useState('');
  const [materialFile, setMaterialFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setMaterialFile(file);
  };

  const handleUpload = async () => {
    if (name && materialName && category && materialFile) {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('materialName', materialName);
        formData.append('category', category);
        formData.append('materialFile', materialFile);

        await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Reset the form fields and file input
        setName('');
        setMaterialName('');
        setCategory('');
        setMaterialFile(null);
      } catch (error) {
        console.error('Error uploading material:', error);
      }
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const engineeringSubjects = [
    'Math',
    'CSE',
    'Hindi',
    'Marathi',
    'Mechanical',
    'Civil',
    'Electrical',
    'Chemical',
    'Aerospace',
    'Biotechnology',
    'Environmental',
    'Petroleum',
    'Software',
    'Telecommunication',
    'Electronics',
  ];

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Study material Upload</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="materialName" className="block text-sm font-medium text-gray-900">
            Material Name
          </label>
          <input
            type="text"
            id="materialName"
            name="materialName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            placeholder="Enter material name"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-900">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Choose a category</option>
            {engineeringSubjects.map((subject) => (
              <option value={subject} key={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="materialFile" className="block text-sm font-medium text-gray-900">
            Material File
          </label>
          <input
            type="file"
            id="materialFile"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleUpload}
          disabled={!name || !materialName || !category || !materialFile}
          className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default StudyUpload;
