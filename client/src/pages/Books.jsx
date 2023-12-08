import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const baseUrl = "http://localhost:4000"

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get(`${baseUrl}/books`)
                setBooks(res.data)
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete(`${baseUrl}/books/${id}`)
            window.location.reload()
        }catch(err) {
            console.log(err)
        }
    }



    return (
        <div>
            <h1>Wisdom Book Shop</h1>
            <div className="books">
                {
                    books.map((book) => (
                        <div className="book" key={book.id}>
                            {book.cover && <img src={book.cover} alt={book.title} />}
                            <h2>{book.title}</h2>
                            <p>{book.desc}</p>
                            <span>{book.price}</span>
                            <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                            <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                        </div>
                    ))
                }
            </div>
            <button>
                <Link to="/add">Add new book</Link>
            </button>
        </div>
    )
}

export default Books
