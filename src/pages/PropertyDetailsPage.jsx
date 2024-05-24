import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { decrementLikes, getPropertiesByIdAsync, incrementLikes, updateLikesAsync } from '../features/property/propertiesSlice';
import image from "../assets/image.png";
import like from "../assets/like.svg";

const PropertyDetailsPage = () => {
    const propertyDetails = useSelector((state) => state.property.propertyDetails);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);

    const handleLikes = (id) => {
        const likesData = JSON.parse(localStorage.getItem("likes")) || {};
        const data = { id: id };

        if (!liked) {
            if (!likesData[id]) {
                data.likes = 1;
                dispatch(updateLikesAsync(data));
                dispatch(incrementLikes());
                likesData[id] = true;
                setLiked(true);
            }
        } else {
            if (likesData[id]) {
                data.likes = -1;
                dispatch(updateLikesAsync(data));
                dispatch(decrementLikes());
                delete likesData[id];
                setLiked(false);
            }
        }

        localStorage.setItem("likes", JSON.stringify(likesData));
    };

    useEffect(() => {
        dispatch(getPropertiesByIdAsync(id));
    }, [id, dispatch]);

    useEffect(() => {
        const likesData = JSON.parse(localStorage.getItem("likes")) || {};
        setLiked(!!likesData[id]);
    }, [id]);


    return (
        <div>
            {propertyDetails ? (
                <div>
                    <div className='flex sm:flex-row flex-col gap-20'>
                        {propertyDetails.imageUrl ? (
                            <img className='sm:h-1/6 sm:w-3/6 rounded-lg' src={propertyDetails.imageUrl} alt={propertyDetails.place} />
                        ) : (
                            <img className='sm:h-1/6 px-4 py-4 mt-10 sm:w-3/6 rounded-lg' src={image} alt={propertyDetails.place} />
                        )}
                        <div className='flex gap-20 flex-col items-center justify-center'>
                            <div className='flex justify-between gap-20'>
                                <p className='font-medium text-lg'><span className='font-bold text-xl'>Place</span>: {propertyDetails.place}</p>
                                <p className='font-medium text-lg'><span className='font-bold text-xl'>Area</span>: {propertyDetails.area}</p>
                            </div>
                            <div className='flex gap-20'>
                                <p className='font-medium text-lg'><span className='font-bold text-xl'>Bedrooms</span>: {propertyDetails.bedrooms}</p>
                                <p className='font-medium text-lg'><span className='font-bold text-xl'>Bathrooms</span>: {propertyDetails.bathrooms}</p>
                            </div>
                            <p className='font-medium text-lg'><span className='font-bold text-xl'>Price:</span> {propertyDetails.price} <span className='font-bold text-xl'>$</span></p>
                            <div className='flex gap-2 items-center justify-center'>
                                <button onClick={() => handleLikes(propertyDetails.id)} className='text-black px-4 py-2 bg-green-500 w-20 rounded-lg'>
                                    {liked ? "DisLike" : "Like"}
                                </button>
                                <div>
                                    <h1>{propertyDetails.likes}</h1>
                                </div>
                                <img className='h-6 ' src={like} alt="like" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Fetching details...</div>
            )}
        </div>
    );
};

export default PropertyDetailsPage;
