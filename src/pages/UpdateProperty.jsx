import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertiesByIdAsync, updatePropertyAsync } from '../features/property/propertiesSlice';

const UpdateProperty = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const property = useSelector((state) => state.property.propertyDetails);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPropertiesByIdAsync(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (property) {
            setImageUrl(property.imageUrl);
            reset({
                place: property.place,
                area: property.area,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                price: property.price
            });
        }
    }, [property, reset]);

    const handleChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        const updatedData = {
            ...data,
            id,
            imageUrl: imageUrl || property.imageUrl
        };
        dispatch(updatePropertyAsync(updatedData));
        navigate('/seller');
    };

    return (
        <div>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Update Property</h1>
                            <div className=''>
                                <input
                                    {...register("place")}
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="place"
                                    placeholder="Place Where Your Property is Located"
                                />
                            </div>
                            <input
                                {...register("area")}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="area"
                                placeholder="Area Where Your Property is Located"
                            />
                            <input
                                {...register("bedrooms")}
                                type="number"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="bedrooms"
                                placeholder="No.of Bedrooms"
                            />
                            <input
                                {...register("bathrooms")}
                                type="number"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="bathrooms"
                                placeholder="No. of Bathrooms"
                            />
                            <input
                                {...register("price")}
                                type="number"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="price"
                                placeholder="Price of Your Property"
                            />
                            <input onChange={handleChange} type='file' className="block border bg-gray-400 border-grey-light w-1/2 mx-auto p-3 rounded mb-4" name="image" placeholder="image" />
                            <img src={imageUrl} alt="uploaded" />
                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-green text-black bg-blue-600 hover:bg-green-dark focus:outline-none my-1"
                            >Update Property</button>
                        </div>
                    </form>
                    <div className="text-grey-dark mt-6">
                        Wanna see Your Properties?
                        <Link className="no-underline text-blue-600 border-b border-blue text-blue" to="/seller">
                            Click Here
                        </Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProperty;
