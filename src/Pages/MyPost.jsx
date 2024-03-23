import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/config'
import { Container, PostCard } from '../components'

function MyPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        dbService.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
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
    )
}

export default MyPost