import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter, getAllPropertiesAsync, sendEmailAsync } from '../features/property/propertiesSlice';
import image from "../assets/image.png";
import { useNavigate } from 'react-router-dom';
import { usePagination } from '../hooks/pagination';
import PaginationBar from './PaginationBar';
import toast, { Toaster } from 'react-hot-toast';

const BuyerPage = () => {
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.property.AllProperties);
  const [filteredProperties, setFilteredProperties] = useState(allProperties); // State for filtered properties
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  useEffect(() => {
    dispatch(getAllPropertiesAsync());
  }, [dispatch]);
  const navigate = useNavigate();
  const handleClick = (id, userId) => {
    const data = {
      propertyId: id,
      sellerId: userId,
      buyerId: localStorage.getItem("userId")
    };
    dispatch(sendEmailAsync(data));
    navigate(`/propertyDetails/${id}`);
  };
  const { activePage, nextPage, previousPage, totalPages, totalItems, items } = usePagination(filteredProperties);

  const handleFilter = () => {
    const filtered = allProperties.filter(property =>
      (!minPrice || property.price >= parseInt(minPrice)) &&
      (!maxPrice || property.price <= parseInt(maxPrice))
    );
    return filtered;
  };

  const handleApplyFilter = () => {
    const filteredProperties = handleFilter();
    dispatch(filter(filteredProperties))
     // Update state with filtered properties
  };
  const[filterOpen,setFilterOpen] = useState(false);

  const handleClearFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    dispatch(getAllPropertiesAsync())
  };

  return (
    <>
      {
        filterOpen ? (
          <div className="flex flex-col items-center  sm:flex-row  sm:h-10 justify-center sm:my-4 my-8">
        <div className='mb-4 sm:mb-0 mx-4  sm:flex-none sm:flex-row  items-center justify-center flex flex-col gap-10'>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-3 py-2 w-full border rounded-md mr-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-3 w-full  py-2 border rounded-md mr-2"
        />
        </div>
       <div className='flex gap-10 mt-4 sm:mt-0'>
       <button
          onClick={handleApplyFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Filter
        </button>

        <button
          onClick={handleClearFilter}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Clear
        </button>
        <button
          onClick={() => setFilterOpen(false)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          X
        </button>
      </div>
       </div>
        ) : <div className='mx-auto my-4 h-10 flex justify-center items-center'>
          <button onClick={() => setFilterOpen(true)} className='bg-green-400 rounded-lg px-7  py-4'>
            Filter
          </button>
        </div>
      }
        <h1 className='text-center sm:text-4xl text-xl   '>List of the Properties for sale</h1>
      <div className='sm:grid sm:grid-cols-4  mx-10 flex flex-col  justify-center items-center'>
       
        {allProperties?.length > 0 ? (
          allProperties.map((property) => (
            <div className='px-2 py-2 rounded-md' key={property.id}>
              <div className="relative w-64 p-4 bg-white shadow-md rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => handleClick(property.id, property.userId)} className="bg-blue-500  text-white px-4 py-2 rounded-md">
                    I'm Interested
                  </button>
                </div>
                {property.imageUrl ? <img className='h-4/6 rounded-lg' src={property.imageUrl} alt={property.place} /> : <img className='h-4/6 rounded-lg' src={image} alt={property.place} />}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.place}</h3>
                  <div className='flex justify-between'>
                    <p className="text-gray-600 mt-2">{property.area}</p>
                    <p className="text-gray-600 mt-2 font-bold">{property.price}<span className='font-bold'>$</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='w-full h-screen flex sm:ml-96 justify-center '>
            <div> <Toaster /></div>
            fetching the data...
          </div>
        )}
      </div>

      <PaginationBar activePage={activePage} nextPage={nextPage} previousPage={previousPage} totalPages={totalPages} totalItems={totalItems} items={items} />
    </>
  );
};

export default BuyerPage;
