import React, { useEffect, useState } from "react";
import axios from "axios";
import  BookCard  from "./BookCard";
import {useNavigate} from "react-router-dom"
import { API } from "../global";
import { Button } from "reactstrap";


export function DisplayAllBooks() {
  // hook useState - simple js function used in react to incerese performance
  const [bookData, setBookData] = useState([]);


const getBooks =()=>{
  axios
  .get(`${API}/books`)
  //promise

  .then((res) => {
    if (res.status === 401) {
      console.log("Data Not Found");
    }
    console.log(res.data)
    setBookData(res.data) //this will take response data and put it in bookData
  });
}
  useEffect(()=> { //avoid number of API calls
  getBooks();
  },[])
 

  console.log(bookData)



  //passing as props instead of onCLick function
  const handleDelete=(id)=>{
    axios.delete(`${API}/books/`+ id).then((res) => {
      if (res.status === 200) {
        getBooks();
      }
      
    }); 
  }

//helps us to programatically navigate or chnage the urls
//as in tracking a zomato order delivery guy
  const navigate = useNavigate()


  return( <div>
    <div>
    <h1>DisplayAllBooks</h1>
    <Button onClick={()=> navigate("/books/add")}>Add Book</Button></div>
    <br/><br/>

    {bookData.map((item)=>{
    return <BookCard key={item.id} value={item} handleDelete={handleDelete}/>
    //here item is de structured object so we are storing it in value
    })}
    
    </div>)
}
