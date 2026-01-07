import React, { useEffect, useState } from 'react'
import service from "../appwrite/service"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    // const [imageUrl, setImageUrl] = useState(null);

    // useEffect(() => {
    //     async function fetchImage() {
    //         const url = await service.getFilePreview(featuredImage);
    //         console.log("Image URL:", url);
    //         setImageUrl(url);
    //     }
    //     fetchImage();
    // },[featuredImage]);
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 hover:-translate-y-1'>
                <div className='w-full flex justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title}
                    className='rounded-xl object-cover aspect-[4/3] w-full h-40' />
                </div>
                <h2
                className='text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors'
                >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard



