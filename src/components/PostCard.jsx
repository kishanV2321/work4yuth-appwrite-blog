import React from 'react'
import dbService from '../appwrite/config'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

function PostCard({ $id, title, featuredImage }) {
    const userData = useSelector((state) => state.auth.userData);

    return (

        <Link to={`/post/${$id}`}>
            {/* <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={dbService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div> */}

            <div class="md:max-w-sm min-w-44 bg-white border border-gray-200 rounded-lg shadow">
                <a href="#">
                    <img class="rounded-t-lg object-fill md:h-48 md:w-96" src={dbService.getFilePreview(featuredImage)} alt={title} />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-wrap text-gray-900">{title}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{userData.name}</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Read more
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>

        </Link>
    )
}


export default PostCard