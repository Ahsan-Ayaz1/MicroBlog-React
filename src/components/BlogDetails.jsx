import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from '../customHooks/useFetch'

export default function BlogDetails() {
    const { id } = useParams()
    const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`)
    const navigate = useHistory()

    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method : 'DELETE'
        }).then(() => {
            navigate.push('/')
        })
    }
    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by: {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    )
}