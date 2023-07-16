import React, { useState } from 'react';
import axios from 'axios';

const StudySearch = ({ uploadedMaterials }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/search', {
        params: { query: searchQuery }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching materials:', error);
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Study  material Search </h2>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-900">
            Search Material
          </label>
          <input
            type="text"
            id="searchQuery"
            name="searchQuery"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            placeholder="Enter material name"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#6469ff] text-white py-2 px-4 rounded-md text-sm font-medium"
        >
          Search
        </button>
      </form>

      <div className="mt-4">
        {searchResults.length > 0 ? (
          <ul className="list-disc pl-6">
            {searchResults.map((material, index) => (
              <li key={index} className="mb-2">
                <a
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {material.materialName}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default StudySearch;
