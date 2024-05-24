import React, { useState } from 'react';

const FilterComponent = ({ data, setFilteredData }) => {
  const [filters, setFilters] = useState({
    place: '',
    area: '',
    minBedrooms: '',
    maxBedrooms: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    const filtered = data.filter(property => {
      return (
        (!filters.place || property.place.toLowerCase().includes(filters.place.toLowerCase())) &&
        (!filters.area || property.area.toLowerCase().includes(filters.area.toLowerCase())) &&
        (!filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms, 10)) &&
        (!filters.maxBedrooms || property.bedrooms <= parseInt(filters.maxBedrooms, 10)) &&
        (!filters.minPrice || property.price >= parseInt(filters.minPrice, 10)) &&
        (!filters.maxPrice || property.price <= parseInt(filters.maxPrice, 10))
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="p-4 bg-gray-100">
      <input
        type="text"
        placeholder="Place"
        name="place"
        value={filters.place}
        onChange={handleInputChange}
        className="block w-full mb-2 px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Area"
        name="area"
        value={filters.area}
        onChange={handleInputChange}
        className="block w-full mb-2 px-3 py-2 border rounded-md"
      />
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          type="number"
          placeholder="Min Bedrooms"
          name="minBedrooms"
          value={filters.minBedrooms}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Max Bedrooms"
          name="maxBedrooms"
          value={filters.maxBedrooms}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          type="number"
          placeholder="Min Price"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Max Price"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        onClick={applyFilters}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterComponent;
