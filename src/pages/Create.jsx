import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

export default function Create() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('mario')
  const [isPending, setIspending] = useState(false)
  const navigate = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = { title, body, author }

    setIspending(true)

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    }).then(() => {
      setIspending(false)
      navigate.push('/')
    })
  }
  return (
    <div className="create">
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Blog title:</label>
        <input required type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="body">Blog body:</label>
        <textarea required id="body" value={body} onChange={(e) => setBody(e.target.value)} ></textarea>

        <label htmlFor="author">Blog author</label>
        <select id="author" value={author} onChange={(e) => setAuthor(e.target.value)} >
          <option value="mario">mario</option>
          <option value="yushi">yushi</option>
        </select>

        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}

      </form>
    </div>
  )
}
