import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const baseUrl = "http://localhost:4000"



const Update = () => {
  const [book, setBook] = useState({
    title : "",
    desc : "",
    price : null,
    cover : ""
  })

  

  const navigate = useNavigate()
  const location = useLocation()

  
  const [id] = location.pathname.split('/').slice(-1)
  console.log(typeof(id))

  useEffect((id) => {
    const fetchAllBooks = async () => {
        try{
            const res = await axios.get(`${baseUrl}/books/${id}`)
            setBook(res.data)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    fetchAllBooks()
}, [])

  // console.log(typeOf(location.pathname.split('/').slice(-1)))



  //doubt
  const handleChange = (event) => {

    setBook((prev) => ({...prev , [event.target.name] : event.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.patch("http://localhost:4000/books/"+id, book)
      navigate("/")
    } catch(err){
      console.log(err)
    }
  }

  console.log(book)

  return (
    <div className='form'>
      <h1>Update the Book</h1>
      <input type="text" name="title" onChange={handleChange} placeholder='title' value={book.title} />
      <input type="text" name="desc" id="" onChange={handleChange} placeholder='desc'/>
      <input type="number" name="price" id="" onChange={handleChange} placeholder='price'/>
      <input type="text" name="cover" id="" onChange={handleChange} placeholder='cover'/>
      <button className='formButton' onClick={handleClick}>Update</button>
    </div>

  )
}

export default Update
