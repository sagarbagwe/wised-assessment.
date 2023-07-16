import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:3000/materials');
      setUploadedMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = uploadedMaterials.filter((material) =>
      material.materialName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDownload = (e, fileUrl, materialName) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = materialName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const CategoryMaterials = ({ category }) => {
    const categoryMaterials = searchResults.length > 0 ? searchResults : uploadedMaterials.filter(
      (material) => material.category === category
    );

    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">{category}</h3>
        {categoryMaterials.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {categoryMaterials.map((material, index) => (
              <a
                key={index}
                href={material.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white shadow-md p-4 rounded-lg block"
                onClick={(e) => handleDownload(e, material.fileUrl, material.materialName)}
              >
                <h4 className="text-lg font-semibold text-blue-500 mb-2">{material.materialName}</h4>
                <p className="text-gray-500">{material.name}</p>
              </a>
            ))}
          </div>
        ) : (
          <p>No materials uploaded for this category.</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Home Page</h2>
        <div>
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
        </div>
        <div className="mt-4">
          <CategoryMaterials category="Math" />
          <CategoryMaterials category="CSE" />
          <CategoryMaterials category="Hindi" />
          <CategoryMaterials category="Marathi" />
          <CategoryMaterials category="Mechanical" />
          <CategoryMaterials category="Civil" />
          <CategoryMaterials category="Electrical" />
          <CategoryMaterials category="Chemical" />
          <CategoryMaterials category="Aerospace" />
          <CategoryMaterials category="Biotechnology" />
          <CategoryMaterials category="Environmental" />
          <CategoryMaterials category="Petroleum" />
          <CategoryMaterials category="Software" />
          <CategoryMaterials category="Telecommunication" />
          <CategoryMaterials category="Electronics" />
        </div>
      </div>
    </div>
  );
};

export default Home;
