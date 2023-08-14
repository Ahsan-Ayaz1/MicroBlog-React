import React, { useEffect, useState } from 'react'
import BlogList from './BlogList'

export default function Home() {
    const [blogs, setBlog] = useState(null)
    const [isPending, setisPending] = useState(true)
    
    // Fetching the data from the db
    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then(res => {
            return res.json()
            })
            .then(data => {
                setBlog(data)
                setisPending(false)
        })
    }, [])

    return (
        <div className="home">
            { isPending && <div>Loading ... </div>}
            {blogs && <BlogList blogs={blogs} title="All blogs!" />}
        </div>
    )
}
