
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {DisplayAllBooks} from "./components/DisplayAllBooks"
import AddBook from './components/AddBook';
import EditBooks from './components/EditBooks';
import React, { useState } from "react";


function App() {
  const [bookData, setBookData] = useState([]);
  //this is called ligfting the state up or from child component as we toook this from Dispalyallbooks
  return (
    <div className="App">
   <BrowserRouter> 
   <Routes>
    <Route path="/" element={<DisplayAllBooks/>}> </Route>
    <Route path="/books/add" element={<AddBook bookData={bookData} setBookData={setBookData}/>}> </Route>
    <Route path="/books/edit/:bookid" element={<EditBooks bookData={bookData} setBookData={setBookData}/>}> </Route>
   
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
