import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteProperty, deletePropertyAsync, getPropertiesAsync } from '../features/property/propertiesSlice'
import image from '../assets/image.png'
import edit from '../assets/edit.png'
import trash from '../assets/trash.png'
import { usePagination } from '../hooks/pagination'
import PaginationBar from './PaginationBar'

const SellerPage = () => {
  const properties = useSelector((state)=>state.property.properties)
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId")
  useEffect(()=>{
    
    dispatch(getPropertiesAsync(userId))
  },[dispatch,properties])
  const navigate = useNavigate();
  const { activePage, nextPage, previousPage, totalPages, totalItems, items } = usePagination(properties);

  const handleEdit = (id) =>{
navigate(`/editProperty/${id}`)
  }
  const handleDelete = (id) =>{
    dispatch(deletePropertyAsync(id));
  }
  
  
  return (
    <div className=''>
        <div className='flex flex-col items-center mt-16'>
            <h1 className='sm:text-4xl text-xl text-center '>Have a property to sell click below to list you property</h1>
            <Link className='px-8 py-4 my-2 bg-blue-400' to="/postProperty">Post</Link>
        </div>
        <div className='flex flex-col items-center mt-16 '>
            <h1 className='sm:text-4xl text-xl text-center'>Here all your listings</h1>
           
    <div className={userId ?  `grid  sm:grid-cols-3  ` : `flex mx-auto text-center` }>
      {
        items.length > 0 ? items.map((property)=>(
          <div className=' h-64 my-4  py-6 rounded-md' key={property.id}>
            <div className='px-2 py-4' >
            
            <div className="relative w-64 p-4 bg-white shadow-md rounded-lg overflow-hidden group">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex  items-center gap-10 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={()=>handleEdit(property.id)} className="  text-white  rounded-md">
          <img   className=' w-10' src={edit} alt="edit" />
        </button>
        <button onClick={()=>handleDelete(property.id)} className="  text-white rounded-md">
          <img src={trash} className='w-10' alt="trash" />
        </button>
      </div>
      {property.imageUrl ?  <img className='h-4/6 max-h-72 rounded-lg' src={property.imageUrl} alt={property.place} /> : <img className='h-4/6 rounded-lg' src={image} alt={property.place} /> }
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.place}</h3>
<div className='flex justify-between'>
<p className="text-gray-600 mt-2">{property.area}</p>
<p className="text-gray-600 mt-2 font-bold">{property.price}<span className='font-bold '>$</span></p>
</div>
      </div>
    </div>
          </div>
          </div>
        )) : 
          <p>
            {
            userId ? properties.length == 0 ? <p className='text-center text-2x' >No listings yet</p> : <p className='text-center text-2xl '>fetching the data</p> : <p className='text-center text-2xl'>login to see your listings</p>
          }
          </p>
        
      }
    </div>
        </div>
        <PaginationBar activePage={activePage} nextPage={nextPage} previousPage={previousPage} totalPages={totalPages} totalItems={totalItems} items={items} />

    </div>
  )
}

export default SellerPage