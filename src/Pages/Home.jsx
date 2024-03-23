import React, { useEffect, useState } from 'react'
import dbService from "../appwrite/config";
import { Container, PostCard } from '../components'
import logo from "../assets/pic-w4y.jpg"

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        dbService.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                    <img class="h-52 sm:h-auto max-w-lg rounded-lg" src={logo} alt="image description" />

                        <div className="p-2 mt-4 w-full">
                            <h1 className="text-2xl font-bold text-white">
                                <a href="/login" className='hover:text-[#ee0404]'>Login to read posts
                                    <button type="button" class="text-white bg-blue-700  hover:bg-[rgb(238,4,4)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center ml-2 ">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                        <span class="sr-only">Icon description</span>
                                    </button>  </a>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <>
            <div className="flex flex-wrap justify-center w-full py-8 mt-4">
                        <img class="h-52 sm:h-auto max-w-lg rounded-lg" src={logo} alt="image description" />
            </div>

            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Home